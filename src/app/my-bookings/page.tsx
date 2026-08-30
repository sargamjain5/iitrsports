"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import Tabs from "@/components/survey/Tabs";

/* ============================================================
   MY BOOKINGS — upcoming (cancellable) + past history.
   Demo data; cancel updates local state only.
   ============================================================ */

type Upcoming = {
  id: number;
  name: string;
  when: string;
  statusCls: string;
  statusGlyph: string;
  statusLabel: string;
};

const initialUpcoming: Upcoming[] = [
  {
    id: 1,
    name: "SAC Football Ground",
    when: "27 Aug 2026 · 6:00 PM · Plot 04",
    statusCls: "st-ok",
    statusGlyph: "△",
    statusLabel: "Confirmed",
  },
  {
    id: 2,
    name: "Tennis Court 1",
    when: "29 Aug 2026 · 5:00 PM · Plot 05",
    statusCls: "st-hold",
    statusGlyph: "▲",
    statusLabel: "Pending",
  },
];

const past = [
  { name: "Multipurpose Hall", when: "18 Aug 2026 · 7:00 PM" },
  { name: "SAC Football Ground", when: "12 Aug 2026 · 6:00 PM" },
];

function UpcomingList() {
  const [items, setItems] = useState(initialUpcoming);

  const cancel = (id: number) =>
    setItems((prev) => prev.filter((b) => b.id !== id));

  if (items.length === 0) {
    return (
      <Reveal className="card" style={{ textAlign: "center", color: "var(--muted)" }}>
        No upcoming bookings. Book a facility to see it here.
      </Reveal>
    );
  }

  return (
    <>
      {items.map((b, i) => (
        <Reveal
          className="card hover"
          key={b.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: i < items.length - 1 ? 10 : 0,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontWeight: 500 }}>{b.name}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
              {b.when}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="chip">
              <span className={b.statusCls}>{b.statusGlyph}</span> {b.statusLabel}
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: "8px 14px" }}
              onClick={() => cancel(b.id)}
            >
              Cancel
            </button>
          </div>
        </Reveal>
      ))}
    </>
  );
}

function PastList() {
  return (
    <>
      {past.map((b, i) => (
        <Reveal
          className="card"
          key={b.name + b.when}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: i < past.length - 1 ? 10 : 0,
            flexWrap: "wrap",
            opacity: 0.75,
          }}
        >
          <div>
            <div style={{ fontWeight: 500 }}>{b.name}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
              {b.when}
            </div>
          </div>
          <span className="chip">
            <span className="st-closed">●</span> Completed
          </span>
        </Reveal>
      ))}
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "My Bookings" }]}
        eyebrow="Signed in as A. Sharma"
        title="My bookings"
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <Tabs
            tabs={[
              { label: "Upcoming", content: <UpcomingList /> },
              { label: "Past", content: <PastList /> },
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
