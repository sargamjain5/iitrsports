"use client";

import { useState } from "react";
import PageShell from "@/components/survey/PageShell";
import PageHead from "@/components/survey/PageHead";
import Reveal from "@/components/survey/Reveal";
import HorizontalGallery, {
  type HImage,
} from "@/components/survey/HorizontalGallery";

/* ============================================================
   GALLERY — two views the user can toggle between:
   • Grid   — simple album-filtered tile grid
   • Scroll — pinned horizontal, landonorris-style
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

// Photo pool: real IIT Roorkee Yoga-Day 2025 shots (pulled from the
// official sports page) mixed with the bundled sport images.
const photoPool = [
  "/gallery/yoga-1.jpeg",
  "/sports/Football.png",
  "/gallery/yoga-4.jpeg",
  "/sports/BasketBall.png",
  "/gallery/yoga-6.jpeg",
  "/sports/Hockey.png",
  "/gallery/yoga-8.jpeg",
  "/sports/Atheletics.png",
  "/gallery/yoga-5.jpeg",
  "/sports/volleyball.png",
  "/gallery/yoga-12.jpeg",
  "/sports/LawnTennis.png",
  "/gallery/yoga-9.jpeg",
  "/sports/Badminton.png",
  "/gallery/yoga-11.jpeg",
  "/sports/Chess.png",
  "/gallery/yoga-3.jpeg",
  "/sports/Rowing.png",
];

const tiles = Array.from({ length: 18 }, (_, i) => {
  const album = albums[i % albums.length];
  return {
    no: String(i + 1).padStart(2, "0"),
    album,
    cap: captions[album],
    src: photoPool[i % photoPool.length],
  };
});

// Horizontal-scroll strip (uses the bundled sport images as mock photos).
const scrollImages: HImage[] = [
  { src: "/sports/Football.png", cap: "Inter-bhawan final" },
  { src: "/sports/BasketBall.png", cap: "Court battle" },
  { src: "/sports/SwimmingPool.jpg", cap: "Morning laps" },
  { src: "/sports/Atheletics.png", cap: "Track finals" },
  { src: "/sports/Hockey.png", cap: "Astro turf" },
  { src: "/sports/LawnTennis.png", cap: "Baseline rally" },
  { src: "/sports/volleyball.png", cap: "Spike & block" },
  { src: "/sports/Badminton.png", cap: "Smash point" },
  { src: "/sports/Chess.png", cap: "The endgame" },
  { src: "/sports/Rowing.png", cap: "On the water" },
  { src: "/sports/Squash.png", cap: "Four walls" },
  { src: "/sports/Yoga.png", cap: "Yoga day" },
];

function GridView() {
  const [active, setActive] = useState("all");
  const shown = tiles.filter((t) => active === "all" || t.album === active);

  return (
    <>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt={`${t.album} — ${t.cap}`} loading="lazy" />
            <span className="no">
              {t.no} · {t.album}
            </span>
            <span className="cap">{t.cap}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function GalleryPage() {
  const [view, setView] = useState<"grid" | "scroll">("grid");

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
          {/* Grid / Scroll toggle */}
          <div
            style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}
          >
            <div className="view-toggle">
              <button
                type="button"
                className={view === "grid" ? "on" : ""}
                onClick={() => setView("grid")}
              >
                Grid
              </button>
              <button
                type="button"
                className={view === "scroll" ? "on" : ""}
                onClick={() => setView("scroll")}
              >
                Scroll
              </button>
            </div>
          </div>

          {view === "grid" && <GridView />}
        </div>

        {/* Horizontal view breaks out of the wrap for a full-bleed strip */}
        {view === "scroll" && <HorizontalGallery images={scrollImages} />}
      </section>
    </PageShell>
  );
}
