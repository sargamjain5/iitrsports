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
const WIDTHS = [230, 400, 190, 300, 460, 250, 340]; // px
const HEIGHTS = [30, 54, 22, 40, 66, 34, 46]; // vh
const TOPS = [8, 36, 14, 4, 24, 52, 20]; // vh

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // slide the strip left→right and deepen the background together
      tl.to(track, { x: () => -distance(), ease: "none" }, 0).fromTo(
        section,
        { backgroundColor: "#e3dbc5" },
        { backgroundColor: "#d3c9ab", ease: "none" },
        0
      );
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
