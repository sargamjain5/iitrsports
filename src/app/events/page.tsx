"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   EVENTS TIMELINE — filterable season fixtures + recent results
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

export default function EventsPage() {
  const [active, setActive] = useState("all");

  const shown = timeline.filter((t) => active === "all" || t.cat === active);

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        eyebrow="Season plan · Spring 2025–26"
        title="Events timeline"
        lead="Every fixture and meet across the season — filter by sport, check details, and follow the results as they land."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <Reveal className="filters" style={{ marginBottom: 26 }}>
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
          </Reveal>

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
              <Reveal className="eyebrow" style={{ marginBottom: 14 }}>
                Recent results
              </Reveal>
              {results.map((r, i) => (
                <Reveal
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
                </Reveal>
              ))}
              <Reveal
                href="/gallery"
                className="sec-link"
                style={{ display: "inline-block", marginTop: 18 }}
              >
                Event gallery →
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
