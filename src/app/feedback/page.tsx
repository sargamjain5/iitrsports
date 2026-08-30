"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   FEEDBACK — type, star rating, details. Demo form (no backend).
   ============================================================ */

const types = [
  "General feedback",
  "Suggestion",
  "Report an issue — facility",
  "Report an issue — equipment",
];

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Feedback" }]}
        eyebrow="Help us improve"
        title="Feedback"
        lead="Rate the facilities, suggest improvements, or report an issue with a ground or equipment."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 680, marginInline: "auto" }}>
          <Reveal
            as="form"
            className="form-card"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="field">
              <label>Type</label>
              <select>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Overall rating</label>
              <div className="stars" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <span
                    key={v}
                    className={v <= (hover || rating) ? "on" : ""}
                    onClick={() => setRating(v)}
                    onMouseEnter={() => setHover(v)}
                    role="button"
                    aria-label={`${v} star${v > 1 ? "s" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="row-2">
              <div className="field">
                <label>Name (optional)</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="field">
                <label>Related facility</label>
                <input type="text" placeholder="e.g. SAC Ground" />
              </div>
            </div>

            <div className="field">
              <label>Details</label>
              <textarea placeholder="Tell us what's working, what isn't, or what to fix" required />
            </div>

            <button className="btn btn-primary btn-block" type="submit">
              {sent ? "Thanks — feedback sent ✓" : "Submit feedback"}
            </button>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
