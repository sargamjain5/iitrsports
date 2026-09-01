"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap nav">

        {/* BRAND */}
        <Link href="/" className="brand">
          IIT ROORKEE SPORTS
        </Link>

        {/* DESKTOP NAV */}
        <nav className={`links ${menuOpen ? "open" : ""}`}>

          <Link href="/">
            HOME
          </Link>

          <Link href="/sports">
            SPORTS
          </Link>

          <Link href="/facilities">
            FACILITIES
          </Link>

          <Link href="/booking">
            TURF
          </Link>

          <Link href="/events">
            EVENTS
          </Link>

          <Link href="/gc">
            GC
          </Link>

          <Link href="/faculty">
            FACULTY
          </Link>

          <Link href="/gallery">
            GALLERY
          </Link>

          <Link href="/login" className="nav-cta">
            LOGIN
          </Link>

        </nav>

        {/* MOBILE MENU */}
        <button
          type="button"
          className="menu-btn"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

      </div>
    </header>
  );
}