"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   TURF BOOKING — pick turf, date, slot, confirm.
   Client-side demo flow (no backend yet).
   ============================================================ */

const turfs = [
  "SAC Football Ground · Plot 04",
  "Hockey Astro Turf · Plot 09",
  "Cricket Nets · Plot 02",
  "Tennis Court 1 · Plot 05",
];

type SlotState = "available" | "booked" | "closed";

const slots: { time: string; state: SlotState }[] = [
  { time: "6:00 AM", state: "available" },
  { time: "7:00 AM", state: "available" },
  { time: "8:00 AM", state: "booked" },
  { time: "4:00 PM", state: "available" },
  { time: "5:00 PM", state: "closed" },
  { time: "6:00 PM", state: "available" },
  { time: "7:00 PM", state: "booked" },
  { time: "8:00 PM", state: "available" },
];

const slotLabel: Record<SlotState, string> = {
  available: "Open",
  booked: "Booked",
  closed: "Closed",
};

const legend = [
  { color: "var(--ok)", label: "Open" },
  { color: "var(--busy)", label: "Booked" },
  { color: "var(--closed)", label: "Closed" },
];

export default function BookingPage() {
  const [turf, setTurf] = useState(turfs[0]);
  const [date, setDate] = useState("2026-08-27");
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const confirm = () => {
    if (!selected) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Turf Booking" }]}
        eyebrow="Book a plot · 4 steps"
        title="Turf booking"
        lead="Pick a turf, choose your date, grab an open slot and confirm — all in one place."
      />

      <section style={{ paddingTop: 20 }}>
        <div
          className="wrap split-2"
          style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 }}
        >
          {/* steps 1-3 */}
          <div style={{ display: "grid", gap: 12 }}>
            <Reveal className="card">
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                1 · Select turf
              </div>
              <div className="field" style={{ margin: 0 }}>
                <select value={turf} onChange={(e) => setTurf(e.target.value)}>
                  {turfs.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </Reveal>

            <Reveal className="card">
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                2 · Select date
              </div>
              <div className="field" style={{ margin: 0 }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </Reveal>

            <Reveal className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div className="eyebrow">3 · Select time slot</div>
                <div className="legend">
                  {legend.map((l) => (
                    <span key={l.label}>
                      <i style={{ background: l.color }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="slot-grid">
                {slots.map((s) => {
                  const isSel = selected === s.time;
                  const clickable = s.state === "available";
                  return (
                    <div
                      key={s.time}
                      className={`slot ${s.state} ${isSel ? "sel" : ""}`}
                      onClick={
                        clickable
                          ? () => {
                              setSelected(s.time);
                              setError(false);
                            }
                          : undefined
                      }
                    >
                      <div className="t">{s.time}</div>
                      <div className="s">{slotLabel[s.state]}</div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* step 4 — summary + form */}
          <Reveal
            className="card"
            style={{
              borderRadius: "var(--r-lg)",
              padding: 24,
              position: "sticky",
              top: 76,
              alignSelf: "start",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              4 · Booking details
            </div>

            <div
              style={{
                fontSize: 13,
                color: "var(--muted)",
                border: "1px dashed var(--line-2)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 16,
              }}
            >
              {error ? (
                <span style={{ color: "var(--busy)" }}>
                  Please select an open slot first.
                </span>
              ) : selected ? (
                <>
                  <b style={{ color: "var(--ink)" }}>{turf}</b>
                  <br />
                  {date} · {selected}
                  <br />
                  <span style={{ color: "var(--ok)" }}>Slot held for 10 min</span>
                </>
              ) : (
                "No slot selected yet."
              )}
            </div>

            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="field">
              <label>Bhawan / Dept</label>
              <input type="text" placeholder="e.g. Rajendra Bhawan" />
            </div>
            <div className="field">
              <label>Purpose</label>
              <input type="text" placeholder="Practice, match, event" />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={confirm}
            >
              {done ? "Booked ✓" : "Confirm booking"}
            </button>

            {done && (
              <div
                style={{
                  marginTop: 14,
                  textAlign: "center",
                  color: "var(--ok)",
                  fontSize: 13,
                }}
              >
                ✓ Booking requested — see My Bookings
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
