"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   GALLERY — album-filtered tile grid (survey placeholder style)
   ============================================================ */

const albums = ["Training", "Competitions", "Inter-IIT", "GC", "Sangram", "BTS"];

const albumFilters = [
  { key: "all", label: "All" },
  { key: "Training", label: "Training" },
  { key: "Competitions", label: "Competitions" },
  { key: "Inter-IIT", label: "Inter-IIT" },
  { key: "GC", label: "GC" },
  { key: "Sangram", label: "Sangram" },
  { key: "BTS", label: "Behind the scenes" },
];

const captions: Record<string, string> = {
  Training: "Morning session",
  Competitions: "Match day",
  "Inter-IIT": "National meet",
  GC: "Bhawan clash",
  Sangram: "Sangram fest",
  BTS: "Behind the scenes",
};

// 18 tiles cycling through the albums, mirroring the design.
const tiles = Array.from({ length: 18 }, (_, i) => {
  const album = albums[i % albums.length];
  return { no: String(i + 1).padStart(2, "0"), album, cap: captions[album] };
});

export default function GalleryPage() {
  const [active, setActive] = useState("all");

  const shown = tiles.filter((t) => active === "all" || t.album === active);

  return (
    <PageShell>
      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="Field notes · the archive"
        title="Gallery"
        lead="Moments from training, competitions, Inter-IIT, GC and Sangram — the season, documented."
      />

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <Reveal className="filters" style={{ marginBottom: 24 }}>
            <span className="flabel">Album</span>
            {albumFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filt ${active === f.key ? "on" : ""}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          <div className="gal">
            {shown.map((t) => (
              <div className="ph" key={t.no}>
                <span className="no">
                  {t.no} · {t.album}
                </span>
                <span className="cap">{t.cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
