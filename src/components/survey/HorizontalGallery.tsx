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

// cycled per tile so the strip feels hand-placed
const WIDTHS = [300, 360, 280, 340, 320];
const HEIGHTS = [380, 260, 440, 300, 340];
const OFFSETS = [0, 70, -30, 40, -60, 20];

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

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
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
                height: HEIGHTS[i % HEIGHTS.length],
                transform: `translateY(${OFFSETS[i % OFFSETS.length]}px)`,
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
