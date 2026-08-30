import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import CountUp from "@/components/survey/CountUp";
import Tabs from "@/components/survey/Tabs";

export const metadata: Metadata = {
  title: "Football · IIT Roorkee Sports",
  description:
    "Football at IIT Roorkee — standings, fixtures, results, squad, coaches and achievements.",
};

const stats = [
  { k: "Teams", to: 22, hl: true },
  { k: "Matches", to: 40 },
  { k: "Athletes", to: 260 },
  { k: "Coaches", to: 3 },
];

const standings = [
  { pos: 1, tm: "Rajendra", p: 7, w: 6, d: 1, l: 0, gd: "+14", pts: 19 },
  { pos: 2, tm: "Jawahar", p: 7, w: 5, d: 1, l: 1, gd: "+9", pts: 16 },
  { pos: 3, tm: "Govind", p: 7, w: 4, d: 2, l: 1, gd: "+6", pts: 14 },
  { pos: 4, tm: "Cautley", p: 7, w: 4, d: 0, l: 3, gd: "+3", pts: 12 },
  { pos: 5, tm: "Azad", p: 7, w: 2, d: 1, l: 4, gd: "−4", pts: 7 },
];

const squad = [
  { in: "AV", name: "A. Verma", role: "Goalkeeper · C" },
  { in: "KM", name: "K. Menon", role: "Striker · 9 goals" },
  { in: "DK", name: "D. Kapoor", role: "Playmaker" },
  { in: "SR", name: "S. Rao", role: "Centre back" },
];

const achievements = [
  { tag: "2025", title: "Inter-Bhawan Champions", sub: "Rajendra Bhawan" },
  { tag: "2024", title: "Inter-IIT Quarter-finalists", sub: "Best finish in 6 years" },
  { tag: "Record", title: "Most goals in a season", sub: "K. Menon · 21" },
];

const rowFlex: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 4px",
  gap: 14,
  flexWrap: "wrap",
};

export default function SportPage() {
  const standingsPanel = (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th className="pos">#</th>
            <th>Bhawan</th>
            <th className="n">P</th>
            <th className="n h">W</th>
            <th className="n h">D</th>
            <th className="n h">L</th>
            <th className="n">GD</th>
            <th className="n">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((r) => (
            <tr key={r.tm} className={r.pos === 1 ? "top" : ""}>
              <td className="pos">{r.pos}</td>
              <td className="tm">{r.tm}</td>
              <td className="n">{r.p}</td>
              <td className="n h">{r.w}</td>
              <td className="n h">{r.d}</td>
              <td className="n h">{r.l}</td>
              <td className="n">{r.gd}</td>
              <td className="n pts">{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const fixturesPanel = (
    <>
      <div style={{ ...rowFlex, borderBottom: "1px solid var(--line)" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Rajendra vs Govind</div>
          <div
            className="muted"
            style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em", marginTop: 3 }}
          >
            Semi · SAC
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: "var(--accent)" }}>2–1</span>
          <span className="chip live">
            <span className="pulse">◎</span>78&apos;
          </span>
        </div>
      </div>
      <div style={{ ...rowFlex, borderBottom: "1px solid var(--line)" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Jawahar vs Cautley</div>
          <div className="muted" style={{ fontSize: 11, textTransform: "uppercase", marginTop: 3 }}>
            Semi · SAC
          </div>
        </div>
        <span className="pill">Sun 4 PM</span>
      </div>
      <div style={rowFlex}>
        <div>
          <div style={{ fontWeight: 500 }}>Final</div>
          <div className="muted" style={{ fontSize: 11, textTransform: "uppercase", marginTop: 3 }}>
            SAC Ground
          </div>
        </div>
        <span className="pill">Sat 6 PM</span>
      </div>
    </>
  );

  const resultsPanel = (
    <>
      <div style={{ ...rowFlex, borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontWeight: 500 }}>Rajendra vs Azad</div>
        <span style={{ fontWeight: 800, fontSize: 18 }}>3–0</span>
      </div>
      <div style={{ ...rowFlex, borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontWeight: 500 }}>
          Govind vs Cautley{" "}
          <span className="accent" style={{ fontSize: 11, textTransform: "uppercase" }}>
            · pens
          </span>
        </div>
        <span style={{ fontWeight: 800, fontSize: 18 }}>1–1</span>
      </div>
      <div style={rowFlex}>
        <div style={{ fontWeight: 500 }}>Jawahar vs Ravindra</div>
        <span style={{ fontWeight: 800, fontSize: 18 }}>2–1</span>
      </div>
    </>
  );

  const squadPanel = (
    <div className="grid-4">
      {squad.map((p) => (
        <Reveal className="person" key={p.name}>
          <div className="av">{p.in}</div>
          <div className="pn">{p.name}</div>
          <div className="pr">{p.role}</div>
        </Reveal>
      ))}
    </div>
  );

  return (
    <PageShell>
      <PageHead
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Sports", href: "/sports" },
          { label: "Football" },
        ]}
        title={<span className="title-lg">Football</span>}
        lead="The biggest draw of the inter-bhawan calendar — 22 teams, a full league and a knockout that packs out SAC Ground each spring."
      >
        <Reveal style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 14px" }}>
          <span className="chip live">
            <span className="pulse">◎</span>In play · Semi
          </span>
          <span className="chip">Plot 04 · SAC Ground</span>
          <span className="chip">Team sport</span>
          <span className="chip">22 bhawans</span>
        </Reveal>
      </PageHead>

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

      {/* tabs */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Tabs
            tabs={[
              { label: "Standings", content: standingsPanel },
              { label: "Fixtures", content: fixturesPanel },
              { label: "Results", content: resultsPanel },
              { label: "Athletes", content: squadPanel },
            ]}
          />
        </div>
      </section>

      {/* coaches & facility */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec-title" style={{ marginBottom: 24 }}>
            Coaches & facility
          </Reveal>
          <div className="grid-3">
            <Reveal className="person">
              <div className="av">RN</div>
              <div className="pn">R. Nair</div>
              <div className="pr">Chief Coach</div>
            </Reveal>
            <Reveal className="person">
              <div className="av">PS</div>
              <div className="pn">P. Singh</div>
              <div className="pr">Assistant Coach</div>
            </Reveal>
            <Reveal href="/facility" className="card link">
              <div className="card-label">Home ground</div>
              <div style={{ fontWeight: 500, fontSize: 16 }}>SAC Football Ground</div>
              <div className="status st-ok" style={{ marginTop: 10 }}>
                △ Book this facility →
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* achievements */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec-title" style={{ marginBottom: 24 }}>
            Achievements
          </Reveal>
          <div className="grid-3">
            {achievements.map((a) => (
              <Reveal className="card" key={a.tag}>
                <div className="tag">{a.tag}</div>
                <div style={{ fontWeight: 500, marginTop: 8 }}>{a.title}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {a.sub}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
