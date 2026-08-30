"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import Link from "next/link";

/* ============================================================
   REVEAL
   Wraps content in the survey ".rv" scroll-reveal animation.
   Adds ".in" when the element scrolls into view (staggered by
   sibling index), matching the design's IntersectionObserver.
   ============================================================ */

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  href?: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
} & Record<string, unknown>;

export default function Reveal({
  children,
  as,
  href,
  className = "",
  delay,
  style,
  ...rest
}: RevealProps) {
  // Render a Next.js Link when href is provided, otherwise the given tag.
  const Tag: ElementType = href ? Link : as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;

          if (delay === undefined) {
            const siblings = Array.from(
              target.parentElement?.children ?? []
            ).filter((c) => c.classList.contains("rv"));

            target.style.transitionDelay = `${Math.max(
              0,
              siblings.indexOf(target)
            ) * 60}ms`;
          }

          target.classList.add("in");
          io.unobserve(target);
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);

    // Safety net: reveal everything after 3s regardless.
    const timer = setTimeout(() => el.classList.add("in"), 3000);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      href={href}
      className={`rv ${className}`.trim()}
      style={delay !== undefined ? { transitionDelay: `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
