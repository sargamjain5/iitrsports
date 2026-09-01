import type { Metadata } from "next";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import { facultyGroups, initials } from "@/data/faculty";

export const metadata: Metadata = {
  title: "Faculty & Staff · IIT Roorkee Sports",
  description:
    "The people behind sport at IIT Roorkee — the Institute Sports Council, sports office and coaching staff, with their designations.",
};

export default function FacultyPage() {
  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
        eyebrow="The people behind the sport"
        title="Faculty & Staff"
        lead="The Institute Sports Council, the sports office and the coaching team who run sport at IIT Roorkee."
      />

      {facultyGroups.map((group) => (
        <section style={{ paddingTop: 0 }} key={group.title}>
          <div className="wrap">
            <Reveal className="sec-title" style={{ marginBottom: 6 }}>
              {group.title}
            </Reveal>
            <Reveal className="lead" style={{ marginTop: 0, marginBottom: 22 }}>
              {group.blurb}
            </Reveal>

            <div className="grid-4">
              {group.members.map((m) => (
                <Reveal className="person" key={`${group.title}-${m.name}-${m.role}`}>
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="av av-photo" src={m.photo} alt={m.name} loading="lazy" />
                  ) : (
                    <div className="av">{initials(m.name)}</div>
                  )}
                  <div className="pn">{m.name}</div>
                  <div className="pr">{m.role}</div>
                  {m.campus && <div className="pr">{m.campus}</div>}
                  {m.email && (
                    <a className="pr person-link" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
