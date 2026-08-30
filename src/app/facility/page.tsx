import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

export const metadata: Metadata = {
  title: "SAC Football Ground · Facilities",
  description:
    "SAC Football Ground — a full-size floodlit pitch at IIT Roorkee. Timings, amenities, rules and booking.",
};

const amenities = [
  "Floodlights",
  "Changing rooms",
  "Seating · 500",
  "First aid",
  "Drinking water",
];

const timings = [
  { k: "Mon–Fri", v: "6 AM – 9 PM" },
  { k: "Weekends", v: "6 AM – 10 PM" },
  { k: "Slot length", v: "60 min" },
];

const rules = [
  "Studs only, no metal spikes",
  "Max 2 slots per bhawan per day",
  "Cancel 2 hrs ahead to free the slot",
];

export default function FacilityPage() {
  return (
    <PageShell>
      <PageHead
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Facilities", href: "/facilities" },
          { label: "SAC Football Ground" },
        ]}
        title="SAC Football Ground"
      >
        <Reveal
          style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 14px" }}
        >
          <span className="chip">Plot 04 · Outdoor</span>
          <span className="chip">
            <span className="st-ok">△</span> Available today
          </span>
          <span className="chip">Floodlit</span>
        </Reveal>
      </PageHead>

      {/* gallery placeholders */}
      <section style={{ paddingTop: 16 }}>
        <div className="wrap">
          <Reveal className="grid-3">
            <div className="ph card" style={{ aspectRatio: "16/9", gridColumn: "span 2" }} />
            <div style={{ display: "grid", gap: 12 }}>
              <div className="ph card" style={{ aspectRatio: "16/9" }} />
              <div className="ph card" style={{ aspectRatio: "16/9" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* overview + sidebar */}
      <section style={{ paddingTop: 0 }}>
        <div
          className="wrap split-2"
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12 }}
        >
          <Reveal className="card" style={{ borderRadius: "var(--r-lg)", padding: 26 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Overview
            </div>
            <p className="lead" style={{ margin: "0 0 20px" }}>
              The main football ground at the Students&apos; Activity Centre — a
              full-size floodlit pitch that hosts inter-bhawan league games, the
              Inter-IIT trials and open evening slots.
            </p>
            <div className="eyebrow" style={{ margin: "0 0 12px" }}>
              Amenities
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {amenities.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </Reveal>

          <div style={{ display: "grid", gap: 12 }}>
            <Reveal className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Timings
              </div>
              {timings.map((t, i) => (
                <div
                  key={t.k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    padding: "6px 0",
                    borderBottom:
                      i < timings.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <span className="muted">{t.k}</span>
                  <span>{t.v}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Rules
              </div>
              <ul style={{ listStyle: "none", fontSize: 12, color: "var(--muted)" }}>
                {rules.map((r) => (
                  <li key={r} style={{ padding: "5px 0" }}>
                    •&nbsp; {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal href="/booking" className="btn btn-primary btn-block">
              Book this facility
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
