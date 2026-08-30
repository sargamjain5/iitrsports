import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import CountUp from "@/components/survey/CountUp";

export const metadata: Metadata = {
  title: "Achievements & Awards · IIT Roorkee Sports",
  description:
    "Inter-IIT medals, campus records, milestones and athlete spotlights from IIT Roorkee sport.",
};

const stats = [
  { k: "Inter-IIT medals", to: 34, hl: true },
  { k: "Campus records", to: 27 },
  { k: "Golds 2025", to: 3 },
  { k: "Athletes honoured", to: 58 },
];

const milestones = [
  {
    year: "2025",
    title: "Best-ever Inter-IIT finish",
    desc: "9 medals including 3 golds at the national meet",
  },
  {
    year: "2024",
    title: "Aquatics team reaches Inter-IIT final",
    desc: "Silver in the men's 4x100 relay",
  },
  {
    year: "2023",
    title: "New 100m campus record",
    desc: "A. Sharma · 10.9s",
  },
  {
    year: "2022",
    title: "Rowing crew wins regional regatta",
    desc: "First IITR gold on water in a decade",
  },
];

const athletes = [
  { in: "AS", name: "A. Sharma", role: "Sprints · 5 golds" },
  { in: "RN", name: "R. Nair", role: "Swimming · record holder" },
  { in: "KM", name: "K. Menon", role: "Football · top scorer" },
  { in: "PD", name: "P. Das", role: "Rowing · regatta gold" },
];

export default function AchievementsPage() {
  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Achievements" }]}
        eyebrow="Records · logged"
        title="Achievements & awards"
      />

      {/* stats */}
      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="stats">
            {stats.map((s) => (
              <Reveal className={`stat ${s.hl ? "hl" : ""}`} key={s.k}>
                <div className="k">{s.k}</div>
                <div className="v">
                  <CountUp to={s.to} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* milestones */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec-title" style={{ marginBottom: 24 }}>
            Major milestones
          </Reveal>
          <Reveal className="timeline">
            {milestones.map((m) => (
              <div className="tl-item" key={m.year}>
                <div className="tl-date">{m.year}</div>
                <div className="tl-title">{m.title}</div>
                <div className="tl-desc">{m.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* athlete spotlight */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec-title" style={{ marginBottom: 24 }}>
            Athlete spotlight
          </Reveal>
          <div className="grid-4">
            {athletes.map((a) => (
              <Reveal className="person" key={a.name}>
                <div className="av">{a.in}</div>
                <div className="pn">{a.name}</div>
                <div className="pr">{a.role}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
