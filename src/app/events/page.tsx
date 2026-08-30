"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import Calendar from "@/components/survey/Calendar";

/* ============================================================
   EVENTS — Calendar / Timeline views.
   Timeline: filterable season fixtures + recent results.
   Calendar: month grid + agenda of the season plan.
   ============================================================ */

const filters = ["all", "Football", "Basketball", "Athletics", "Swimming", "Cricket"];

const timeline = [
  {
    cat: "Football",
    date: "Today · 5:00 PM · SAC Ground",
    title: "Football Semi — Rajendra vs Govind",
    desc: "Live now · 2–1 · registration closed",
  },
  {
    cat: "Basketball",
    date: "Sat · 6:00 PM · MP Hall",
    title: "Basketball Final — Ganga vs Kasturba",
    desc: "Knockout final · open to spectators",
  },
  {
    cat: "Athletics",
    date: "Sat · 9:00 AM · Main Stadium",
    title: "Track & Field Finals",
    desc: "100m, 200m, long jump, relays",
  },
  {
    cat: "Swimming",
    date: "24 Aug · 6:00 AM · Pool",
    title: "Inter-IIT Swimming Trials",
    desc: "Squad selection · register by 23 Aug",
  },
  {
    cat: "Cricket",
    date: "26 Aug · 5:00 PM · Main Ground",
    title: "Cricket Semi — Jawahar vs Govind",
    desc: "Registration open till 25 Aug",
  },
];

const results = [
  { label: "Football · Rajendra v Azad", score: "3–0" },
  { label: "Hockey · Jawahar v Ravindra", score: "4–2" },
  { label: "Swimming · 200m Free", score: "1:58" },
  { label: "Basketball · Ganga v Sarojini", score: "61–54" },
];

function TimelineView() {
  const [active, setActive] = useState("all");
  const shown = timeline.filter((t) => active === "all" || t.cat === active);

  return (
    <>
      <div className="filters" style={{ marginBottom: 26 }}>
        <span className="flabel">Sport</span>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`filt ${active === f ? "on" : ""}`}
            onClick={() => setActive(f)}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      <div
        className="split-2"
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 30 }}
      >
        <div className="timeline">
          {shown.map((t) => (
            <div className="tl-item" key={t.title}>
              <div className="tl-date">{t.date}</div>
              <div className="tl-title">{t.title}</div>
              <div className="tl-desc">{t.desc}</div>
            </div>
          ))}
          {shown.length === 0 && (
            <div className="tl-item">
              <div className="tl-desc">No fixtures for this sport yet.</div>
            </div>
          )}
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Recent results
          </div>
          {results.map((r, i) => (
            <div
              key={r.label}
              className="card"
              style={{
                marginBottom: i < results.length - 1 ? 10 : 0,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 13 }}>{r.label}</span>
              <b>{r.score}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function EventsPage() {
  const [view, setView] = useState<"calendar" | "timeline">("calendar");

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        eyebrow="Season plan · Spring 2025–26"
        title="What's on"
        lead="Every fixture, tournament and key date across the season — switch between the calendar and the live fixture timeline, filter, and follow the results."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          {/* Calendar / Timeline switch */}
          <Reveal
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <div className="view-toggle">
              <button
                type="button"
                className={view === "calendar" ? "on" : ""}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
              <button
                type="button"
                className={view === "timeline" ? "on" : ""}
                onClick={() => setView("timeline")}
              >
                Timeline
              </button>
            </div>
          </Reveal>

          {view === "calendar" ? <Calendar /> : <TimelineView />}
        </div>
      </section>
    </PageShell>
  );
}
