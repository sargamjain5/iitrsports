import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import { facilities, statusMeta } from "@/data/facilities";

export const metadata: Metadata = {
  title: "Facilities · IIT Roorkee Sports",
  description:
    "Grounds, courts and halls across the IIT Roorkee campus — timings, rules and live availability.",
};

const legend = [
  { color: "var(--ok)", label: "Available" },
  { color: "var(--busy)", label: "Booked" },
  { color: "var(--closed)", label: "Closed" },
  { color: "var(--hold)", label: "Reserved" },
];

export default function FacilitiesPage() {
  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
        eyebrow="12 venues surveyed"
        title="Facilities"
        lead="Grounds, courts and halls across campus — check timings, rules and live availability, then book your slot."
      >
        <Reveal className="legend" style={{ marginTop: 18 }}>
          {legend.map((l) => (
            <span key={l.label}>
              <i style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </Reveal>
      </PageHead>

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="grid-3">
            {facilities.map((f) => {
              const m = statusMeta[f.status];
              return (
                <Reveal
                  href="/facility"
                  className="card link"
                  key={f.name}
                >
                  <div className="card-label">{f.location}</div>
                  <div style={{ fontWeight: 500, fontSize: 16 }}>{f.name}</div>
                  <div className={`status ${m.cls}`} style={{ marginTop: 12 }}>
                    {m.glyph} {f.note}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
