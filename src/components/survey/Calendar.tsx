"use client";

import { useMemo, useState } from "react";
import {
  calendarEvents,
  calendarFilters,
  MONTHS,
  WEEKDAYS,
  toDate,
  within,
  rangeLabel,
  gcalLink,
  type CalendarCategory,
} from "@/data/calendarEvents";

/* ============================================================
   CALENDAR — month grid + agenda, filterable by category.
   Ported from the survey "What's on" design.
   ============================================================ */

type Cat = "all" | CalendarCategory;

const SEASON_START = { year: 2026, month: 0 }; // January 2026

export default function Calendar() {
  const [cat, setCat] = useState<Cat>("all");
  const [mode, setMode] = useState<"month" | "agenda">("month");
  const [year, setYear] = useState(SEASON_START.year);
  const [month, setMonth] = useState(SEASON_START.month);

  const today = useMemo(() => new Date(), []);

  const inCat = (c: CalendarCategory) => cat === "all" || c === cat;

  /* ---- month grid cells ---- */
  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const lead = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const out: {
      blank: boolean;
      day?: number;
      isToday?: boolean;
      events?: typeof calendarEvents;
    }[] = [];

    for (let i = 0; i < lead; i++) out.push({ blank: true });

    for (let day = 1; day <= daysInMonth; day++) {
      const cur = new Date(year, month, day, 12, 0, 0);
      const events = calendarEvents.filter((ev) => inCat(ev.c) && within(cur, ev));
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day;
      out.push({ blank: false, day, isToday, events });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, cat, today]);

  /* ---- agenda groups ---- */
  const agenda = useMemo(() => {
    const list = calendarEvents
      .filter((ev) => inCat(ev.c))
      .sort((a, b) => toDate(a.s).getTime() - toDate(b.s).getTime());

    const groups: { label: string; items: typeof calendarEvents }[] = [];
    list.forEach((ev) => {
      const start = toDate(ev.s);
      const label = `${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
      const last = groups[groups.length - 1];
      if (!last || last.label !== label) groups.push({ label, items: [ev] });
      else last.items.push(ev);
    });
    return groups;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  const prevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };
  const nextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };
  const jumpToSeason = () => {
    setYear(SEASON_START.year);
    setMonth(SEASON_START.month);
  };

  return (
    <div>
      {/* toolbar: category filters + month/agenda toggle */}
      <div className="cal-toolbar">
        <div className="filters">
          <span className="flabel">Show</span>
          {calendarFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filt ${cat === f.key ? "on" : ""}`}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            type="button"
            className={mode === "month" ? "on" : ""}
            onClick={() => setMode("month")}
          >
            Month
          </button>
          <button
            type="button"
            className={mode === "agenda" ? "on" : ""}
            onClick={() => setMode("agenda")}
          >
            Agenda
          </button>
        </div>
      </div>

      {/* month view */}
      {mode === "month" && (
        <div>
          <div className="mnav">
            <button type="button" aria-label="Previous month" onClick={prevMonth}>
              ‹
            </button>
            <div className="mo">
              {MONTHS[month]} {year}
            </div>
            <button type="button" aria-label="Next month" onClick={nextMonth}>
              ›
            </button>
            <button type="button" className="today-btn" onClick={jumpToSeason}>
              Season start
            </button>
          </div>

          <div className="grid7">
            {WEEKDAYS.map((w) => (
              <div className="gh" key={w}>
                {w}
              </div>
            ))}
            {cells.map((c, i) =>
              c.blank ? (
                <div className="cell blank" key={`b-${i}`} />
              ) : (
                <div
                  className={`cell ${c.isToday ? "today" : ""} ${
                    c.events && c.events.length ? "has" : ""
                  }`}
                  key={`d-${c.day}`}
                >
                  <div className="cd">{c.day}</div>
                  {c.events?.slice(0, 2).map((ev) => (
                    <div
                      className={`chip-ev ${ev.c === "Academic" ? "acad" : ""}`}
                      key={ev.t}
                      title={ev.t}
                    >
                      {ev.t}
                    </div>
                  ))}
                  {c.events && c.events.length > 2 && (
                    <div className="chip-ev more">+{c.events.length - 2} more</div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* agenda view */}
      {mode === "agenda" && (
        <div>
          {agenda.length === 0 ? (
            <div className="cal-empty">Nothing in this category.</div>
          ) : (
            agenda.map((group) => (
              <div key={group.label}>
                <div className="mgroup-h">{group.label}</div>
                {group.items.map((ev) => (
                  <div className={`ev ${ev.c === "Academic" ? "acad" : ""}`} key={ev.t}>
                    <span className="date">{rangeLabel(ev)}</span>
                    <span className="cat">{ev.c}</span>
                    <div className="body">
                      <div className="mt">{ev.t}</div>
                      {ev.n && <div className="mm">{ev.n}</div>}
                    </div>
                    <a
                      className="ics"
                      title="Add to Google Calendar"
                      href={gcalLink(ev)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +
                    </a>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
