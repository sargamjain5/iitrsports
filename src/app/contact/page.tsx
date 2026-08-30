"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   CONTACT — office details, department contacts, message form.
   Demo form (no backend); submit just acknowledges locally.
   ============================================================ */

const deptContacts = [
  { role: "Sports Secretary", value: "A. Verma" },
  { role: "Chief Coach", value: "R. Nair" },
  { role: "Facility desk", value: "+91 1332 285 YYY" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="29.8543°N 77.8880°E"
        title="Contact us"
      />

      <section style={{ paddingTop: 20 }}>
        <div
          className="wrap split-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}
        >
          {/* left: details */}
          <div>
            <Reveal className="card" style={{ marginBottom: 12 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Sports office
              </div>
              <div style={{ fontSize: 14 }}>Students&apos; Activity Centre (SAC)</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                IIT Roorkee, Roorkee 247667
              </div>
              <div style={{ fontSize: 13, marginTop: 12 }}>✉&nbsp; sports@iitr.ac.in</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>☎&nbsp; +91 1332 285 XXX</div>
            </Reveal>

            <Reveal className="card">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Department contacts
              </div>
              {deptContacts.map((c, i) => (
                <div
                  key={c.role}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    padding: "7px 0",
                    borderBottom:
                      i < deptContacts.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <span className="muted">{c.role}</span>
                  <span>{c.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="map" style={{ marginTop: 12 }}>
              Location map · SAC, IIT Roorkee
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal
            as="form"
            className="form-card"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Send a message
            </div>
            <div className="row-2">
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="you@iitr.ac.in" required />
              </div>
            </div>
            <div className="field">
              <label>Subject</label>
              <input type="text" placeholder="What's this about?" required />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="Type your message" required />
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              {sent ? "Message sent ✓" : "Send message"}
            </button>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
