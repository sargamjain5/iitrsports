"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   COUNT UP
   Animates a number from 0 → target once it scrolls into view.
   ============================================================ */

export default function CountUp({
  to,
  duration = 1100,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduce) {
        setValue(to);
        return;
      }

      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(to * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value >= 1000 ? value.toLocaleString("en-IN") : value}
    </span>
  );
}
