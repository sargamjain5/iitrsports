"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */

type Event = {
  _id?: string;
  eventName: string;
  photo: string;
  date: string;
  description: string;
};

type GalleryImage = {
  _id?: string;
  id?: string;
  url: string;
  public_id?: string;
};

/* ============================================================
   COUNT UP ANIMATION
   ============================================================ */

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration]);

  return value;
}

/* ============================================================
   STAT COMPONENT
   ============================================================ */

function Stat({
  label,
  value,
  highlight = false,
  suffix = "",
}: {
  label: string;
  value: number;
  highlight?: boolean;
  suffix?: string;
}) {
  const count = useCountUp(value);

  return (
    <div className={`stat ${highlight ? "hl" : ""}`}>
      <div className="k">{label}</div>

      <div className="v">
        {count.toLocaleString("en-IN")}
        {suffix && <span className="u">{suffix}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   DATE FORMATTER
   ============================================================ */

function formatEventDate(date: string) {
  const eventDate = new Date(date);

  if (Number.isNaN(eventDate.getTime())) {
    return date;
  }

  return eventDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ============================================================
   HOME PAGE
   ============================================================ */

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  /* ============================================================
     FETCH UPCOMING EVENTS
     ============================================================ */

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        const eventList = Array.isArray(data)
          ? data
          : data.events || [];

        setEvents(eventList);
      } catch (error) {
        console.error("Events fetch error:", error);
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* ============================================================
     FETCH GALLERY
     ============================================================ */

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data = await response.json();

        const images = Array.isArray(data)
          ? data
          : data.images || [];

        setGallery(images);
      } catch (error) {
        console.error("Gallery fetch error:", error);
        setGallery([]);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main>

      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <Navbar />

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="hero">

        <svg
          className="contour"
          viewBox="0 0 600 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#9da391"
            strokeWidth="1"
          >
            <path d="M100 400 Q240 280 220 100 Q210 0 340 -20" />
            <path d="M160 400 Q280 300 270 140 Q265 40 400 10" />
            <path d="M230 400 Q330 320 325 170 Q322 80 460 50" />
            <path d="M310 400 Q390 330 390 200 Q390 130 520 100" />
            <path d="M400 400 Q460 350 465 230 Q470 180 580 160" />
          </g>
        </svg>

        <div className="wrap inner">
          <h1 className="title">
            COMPETE.CONQUER.
            <br />
            <span className="ac">
              CREATE HISTORY.
            </span>
          </h1>

          <p className="lead">
            The home of sport at IIT Roorkee — every sport,
            facility, fixture and record, plotted and open to all.
            Book a turf, follow the GC race, relive the season.
          </p>

          <div className="hero-buttons">

            <Link
              href="/booking"
              className="btn btn-primary"
            >
              BOOK A FACILITY
            </Link>

            <Link
              href="/events"
              className="btn btn-ghost"
            >
              VIEW EVENTS
            </Link>

            <Link
              href="/gc"
              className="btn btn-ghost"
            >
              GC STANDINGS
            </Link>

            <Link
              href="/contact"
              className="btn btn-ghost"
            >
              CONTACT US
            </Link>

          </div>

        </div>
      </section>

      {/* ======================================================
          STATS
          ====================================================== */}

      <section className="stats-section">
        <div className="wrap">

          <div className="stats">

            <Stat
              label="SPORTS"
              value={18}
              highlight
            />

            <Stat
              label="FACILITIES"
              value={12}
            />

            <Stat
              label="ATHLETES"
              value={1200}
              suffix="+"
            />

            <Stat
              label="BHAWANS IN GC"
              value={22}
            />

          </div>

        </div>
      </section>

{/* ================= INTER-IIT ================= */}

<section className="interiit-section">
  <div className="wrap">
    <div className="interiit-card">

      <div className="interiit-content">

        <div className="eyebrow interiit-eyebrow">
          Inter-IIT Highlights
        </div>

        <h3 className="interiit-title">
          ROORKEE AT THE INTER-IIT SPORTS MEET
        </h3>

        <p className="interiit-description">
          Medals, records and squad journeys from the national stage
          — the season&apos;s proudest results in one place.
        </p>

      </div>

      <div className="interiit-stats">

        <div className="interiit-stat">
          <div className="interiit-stat-value highlight">
            9
          </div>

          <div className="interiit-stat-label">
            MEDALS 2025
          </div>
        </div>

        <div className="interiit-stat">
          <div className="interiit-stat-value">
            3
          </div>

          <div className="interiit-stat-label">
            GOLDS
          </div>
        </div>

      </div>

    </div>
  </div>
</section>
      {/* ======================================================
          UPCOMING EVENTS
          ====================================================== */}

      <section className="section events-section">
        <div className="wrap">

          <div className="sec-head">

            <div>
              <div className="eyebrow section-eyebrow">
                COMING UP
              </div>

              <div className="sec-title">
                Upcoming events
              </div>
            </div>

            <Link
              href="/events"
              className="sec-link"
            >
              FULL CALENDAR →
            </Link>

          </div>

          {eventsLoading ? (

            <div className="events-loading">
              <div className="loading-line" />
              <div className="loading-line" />
              <div className="loading-line" />
            </div>

          ) : events.length === 0 ? (

            <div className="events-empty">
              <div className="empty-icon">◎</div>
              <p>No upcoming events yet.</p>
            </div>

          ) : (

            <div className="events-grid">

              {events.slice(0, 3).map((event) => (

                <article
                  className="event-card"
                  key={event._id || event.eventName}
                >

                  <div className="event-image">

                    <img
                      src={event.photo}
                      alt={event.eventName}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement?.classList.add(
                          "image-fallback"
                        );
                      }}
                    />

                    <div className="event-image-label">
                      UPCOMING EVENT
                    </div>

                  </div>

                  <div className="event-content">

                    <h3 className="event-name">
                      {event.eventName}
                    </h3>

                    <div className="event-date">
                      {formatEventDate(event.date)}
                    </div>

                    <p className="event-description">
                      {event.description}
                    </p>

                    <div className="event-footer">

                      <span className="event-date-pill">
                        {formatEventDate(event.date)}
                      </span>

                      <span className="event-arrow">
                        →
                      </span>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>

      {/* ======================================================
          GALLERY
          ====================================================== */}

      <section className="gallery-section">

        <div className="wrap">

          <div className="gallery-header">

            <div>
              <div className="eyebrow gallery-label">
                GALLERY PREVIEW
              </div>

              <div className="sec-title">
                From the field
              </div>
            </div>

            <Link
              href="/gallery"
              className="sec-link"
            >
              VIEW GALLERY →
            </Link>

          </div>

        </div>

        <div className="gallery-strip">

          {galleryLoading ? (

            <div className="gallery-loading">
              LOADING GALLERY...
            </div>

          ) : gallery.length === 0 ? (

            <div className="gallery-empty">
              NO GALLERY IMAGES YET.
            </div>

          ) : (

            <div className="gallery-track">

              {[...gallery, ...gallery].map(
                (image, index) => (

                  <Link
                    href="/gallery"
                    className="gallery-image"
                    key={`${image._id || image.id || index}-${index}`}
                  >

                    <img
                      src={image.url}
                      alt="IIT Roorkee sports"
                    />

                  </Link>

                )
              )}

            </div>

          )}

        </div>

      </section>

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <Footer />

    </main>
  );
}