"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   HORIZONTAL GALLERY
   The section pins while the track scrubs left→right with scroll
   (landonorris-style). Tiles have varied heights + vertical
   offsets so they read as a scattered strip, not a neat row.
   Falls back to a normal horizontal swipe on mobile / reduced motion.
   ============================================================ */

export type HImage = { src: string; cap: string };

// Cycled per tile so the strip feels hand-placed. Width + height share
// the same index so small tiles are small in both dims (thumbnail) and
// large tiles are large features — like the landonorris scatter. TOPS
// (vh from the top of the strip) spread them across the viewport height.
// Wide height range (18vh thumbnails → 82vh hero tiles) for a dramatic,
// scattered read.
const WIDTHS = [220, 380, 170, 300, 480, 240, 360]; // px
const HEIGHTS = [26, 58, 18, 44, 82, 34, 66]; // vh
const TOPS = [10, 30, 8, 2, 12, 54, 22]; // vh

export default function HorizontalGallery({ images }: { images: HImage[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const isMobile = window.innerWidth < 760;

    // Fallback: plain horizontal swipe, no pinning.
    if (reduce || isMobile) {
      section.classList.add("hgal-static");
      return;
    }

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const cards = track.querySelectorAll<HTMLElement>(".hcard");

      // Start hidden — the strip reveals once the section takes over the screen.
      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // extra ~1 viewport of scroll is spent on the intro reveal
          end: () => "+=" + (distance() + window.innerHeight),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // slide the navbar away while the immersive strip is on screen
          onToggle: (self) =>
            document.documentElement.classList.toggle(
              "gal-immersive",
              self.isActive
            ),
        },
      });

      // 1) background sweeps in to fill the page, then the images rise in…
      tl.fromTo(
        section,
        { backgroundColor: "#efe9d6" },
        { backgroundColor: "#e3dbc5", ease: "none", duration: 0.5 },
        0
      ).to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          stagger: 0.04,
          duration: 0.5,
        },
        0.15
      );

      // 2) …then the strip scrubs left→right, deepening the sand as it goes.
      tl.to(track, { x: () => -distance(), ease: "none", duration: 2.4 }, 0.65)
        .to(
          section,
          { backgroundColor: "#d3c9ab", ease: "none", duration: 2.4 },
          0.65
        );
    }, sectionRef);

    return () => {
      document.documentElement.classList.remove("gal-immersive");
      ctx.revert();
    };
  }, [images]);

  return (
    <div className="hgal-section" ref={sectionRef}>
      <div className="hgal-inner">
        <div className="hgal-track" ref={trackRef}>
          {images.map((img, i) => (
            <figure
              className="hcard"
              key={`${img.src}-${i}`}
              style={{
                width: WIDTHS[i % WIDTHS.length],
                height: `${HEIGHTS[i % HEIGHTS.length]}vh`,
                marginTop: `${TOPS[i % TOPS.length]}vh`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.cap} loading="lazy" />
              <figcaption className="hcap">
                <span className="hno">{String(i + 1).padStart(2, "0")}</span>
                {img.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
