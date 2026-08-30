"use client";

import { useState, type ReactNode } from "react";

/* ============================================================
   TABS
   Survey-style tab bar with animated panels.
   ============================================================ */

export type Tab = { label: string; content: ReactNode };

export default function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: Tab[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);

  return (
    <>
      <div className="tabs" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`tab-btn ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          className={`panel ${active === i ? "active" : ""}`}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
