import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import Tabs from "@/components/survey/Tabs";

export const metadata: Metadata = {
  title: "General Championship · IIT Roorkee Sports",
  description:
    "The season-long inter-bhawan points race across all 18 sports — standings, champions and Hall of Fame.",
};

const standings = [
  { pos: 1, tm: "Rajendra Bhawan", g: 6, s: 3, b: 2, pts: 184 },
  { pos: 2, tm: "Jawahar Bhawan", g: 4, s: 5, b: 3, pts: 161 },
  { pos: 3, tm: "Govind Bhawan", g: 3, s: 4, b: 5, pts: 148 },
  { pos: 4, tm: "Ganga Bhawan", g: 3, s: 2, b: 4, pts: 132 },
  { pos: 5, tm: "Cautley Bhawan", g: 2, s: 3, b: 2, pts: 118 },
  { pos: 6, tm: "Kasturba Bhawan", g: 1, s: 2, b: 4, pts: 96 },
];

const champions = [
  { sport: "Football", bhawan: "Rajendra" },
  { sport: "Basketball", bhawan: "Ganga" },
  { sport: "Cricket", bhawan: "Jawahar" },
  { sport: "Athletics", bhawan: "Govind" },
  { sport: "Swimming", bhawan: "Rajendra" },
  { sport: "Hockey", bhawan: "Cautley" },
  { sport: "Volleyball", bhawan: "Jawahar" },
  { sport: "Badminton", bhawan: "Ganga" },
];

const history = [
  { year: "2024–25", champ: "Rajendra Bhawan", runner: "Jawahar", pts: 184 },
  { year: "2023–24", champ: "Jawahar Bhawan", runner: "Govind", pts: 176 },
  { year: "2022–23", champ: "Rajendra Bhawan", runner: "Cautley", pts: 169 },
  { year: "2021–22", champ: "Govind Bhawan", runner: "Rajendra", pts: 158 },
];

const hof = [
  { tag: "Most GC titles", main: "Rajendra Bhawan", sub: "9 titles since 2010" },
  { tag: "Record points", main: "191 pts · 2019", sub: "Jawahar Bhawan" },
  { tag: "Legend", main: "A. Sharma", sub: "5 individual golds" },
];

function scroll(children: React.ReactNode) {
  return <div style={{ overflowX: "auto" }}>{children}</div>;
}

export default function GCPage() {
  const standingsPanel = scroll(
    <table>
      <thead>
        <tr>
          <th className="pos">#</th>
          <th>Bhawan</th>
          <th className="n h">Gold</th>
          <th className="n h">Silver</th>
          <th className="n h">Bronze</th>
          <th className="n">Points</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((r) => (
          <tr key={r.tm} className={r.pos === 1 ? "top" : ""}>
            <td className="pos">{r.pos}</td>
            <td className="tm">{r.tm}</td>
            <td className="n h">{r.g}</td>
            <td className="n h">{r.s}</td>
            <td className="n h">{r.b}</td>
            <td className="n pts">{r.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const champsPanel = (
    <div className="grid-4">
      {champions.map((c) => (
        <Reveal className="card" key={c.sport}>
          <div className="tag">{c.sport}</div>
          <div style={{ fontWeight: 500, marginTop: 6 }}>{c.bhawan}</div>
        </Reveal>
      ))}
    </div>
  );

  const historyPanel = scroll(
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Overall Champion</th>
          <th className="h">Runner-up</th>
          <th className="n">Points</th>
        </tr>
      </thead>
      <tbody>
        {history.map((r, i) => (
          <tr key={r.year} className={i === 0 ? "top" : ""}>
            <td className="tm">{r.year}</td>
            <td>{r.champ}</td>
            <td className="h">{r.runner}</td>
            <td className="n pts">{r.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const hofPanel = (
    <div className="grid-3">
      {hof.map((h) => (
        <Reveal className="card" key={h.tag}>
          <div className="tag">{h.tag}</div>
          <div style={{ fontWeight: 500, marginTop: 6, fontSize: 16 }}>{h.main}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
            {h.sub}
          </div>
        </Reveal>
      ))}
    </div>
  );

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "General Championship" }]}
        eyebrow="Hostel-wise competition · 2025–26"
        title="General Championship"
        lead="The season-long inter-bhawan points race across all 18 sports — live standings, sport-wise champions and the Hall of Fame."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <Tabs
            tabs={[
              { label: "Standings", content: standingsPanel },
              { label: "Sport-wise champions", content: champsPanel },
              { label: "History", content: historyPanel },
              { label: "Hall of Fame", content: hofPanel },
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
