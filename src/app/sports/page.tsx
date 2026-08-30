"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./sports.css";
import "@/app/globals.css";

gsap.registerPlugin(ScrollTrigger);

const sports = [
  {
    name: "Football",
    image: "/sports/Football.png",
    description:
      "The beautiful game at IIT Roorkee — competitive fixtures, training and the General Championship.",
  },
  {
    name: "Volleyball",
    image: "/sports/volleyball.png",
    description:
      "Teamwork, precision and relentless rallies across IIT Roorkee's volleyball competitions.",
  },
  {
    name: "Swimming",
    image: "/sports/SwimmingPool.jpg",
    description:
      "Speed, endurance and technique come together in IIT Roorkee's swimming competitions.",
  },
  {
    name: "Athletics",
    image: "/sports/Atheletics.png",
    description:
      "Track and field athletes representing IIT Roorkee across sprints, distance and field events.",
  },
  {
    name: "Table Tennis",
    image: "/sports/TT.png",
    description:
      "Quick reactions and technical precision define IIT Roorkee's table tennis circuit.",
  },
  {
    name: "Basketball",
    image: "/sports/BasketBall.png",
    description:
      "From casual pickup games and youth training camps to intense league finals, this court adapts to your schedule. It is more than just lines on a floor",
  },
  {
    name: "Chess",
    image: "/sports/Chess.png",
    description:
      "Finding that one brilliant, elusive move that shatters an opponent's defense.",
  },
  {
    name: "Lawn Tennis",
    image: "/sports/LawnTennis.png",
    description:
      "Lawn tennis is a fast-paced racquet sport where individuals or pairs hit a ball over a net into the opponent's court",
  },
  {
    name: "Badminton",
    image: "/sports/Badminton.png",
    description:
      "Badminton is a high-speed racquet sport played by hitting a feathered shuttlecock over a net.",
  },
  {
    name: "Yoga",
    image: "/sports/Yoga.png",
    description:
      "Yoga is an ancient physical, mental, and spiritual practice centered on breath control, meditation, and bodily postures.",
  },

  {
    name: "Squash",
    image: "/sports/Squash.png",
    description:
      "Squash is a high-intensity, fast-paced racquet sport played by two or four players in a four-walled court with a small, hollow rubber ball.",
  },
  {
    name: "Rowing",
    image: "/sports/Rowing.png",
    description:
      "Rowing is a water-based sport where athletes propel a boat using oars to race against opponents on a linear course.",
  },
  {
    name: "Taekwondo",
    image: "/sports/Taekwondo.png",
    description:
      "Taekwondo is a Korean martial art and Olympic sport characterized by fast, high, and spinning kicking techniques."
  },
  {
    name: "Weightlifting",
    image: "/sports/weightlifting.png",
    description:
      "Weightlifting is an Olympic sport centered on the ultimate test of explosive ballistic strength, where athletes attempt to lift a loaded barbell overhead."
  },
  {
    name: "Hockey",
    image: "/sports/Hockey.png",
    description:
      "Hockey is a fast-paced, high-intensity sport where teams use curved sticks to drive a ball or puck into the opponent's net"
  },
];

export default function SportsPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const ctx = gsap.context(() => {
      const ease = "power3.out";

      // Header entrance on load.
      gsap
        .timeline({ defaults: { ease } })
        .from(".sports-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
        .from(".sports-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.35")
        .from(".sports-intro", { y: 24, opacity: 0, duration: 0.6 }, "-=0.45");

      // Cards reveal on scroll, staggered.
      gsap.from(".sport-card", {
        y: 44,
        opacity: 0,
        duration: 0.6,
        ease,
        stagger: 0.07,
        scrollTrigger: { trigger: ".sports-grid", start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Navbar />

      <main className="sports-page">

        {/* ================= HEADER ================= */}

        <section className="sports-header">
          <div className="sports-eyebrow">
            7 DISCIPLINES SURVEYED
          </div>

          <h1 className="sports-title">
            ALL SPORTS
          </h1>

          <p className="sports-intro">
            Every discipline at IIT Roorkee, discover the sports,
            athletes, facilities and competitions that make campus
            sport what it is.
          </p>
        </section>

        {/* ================= SPORTS GRID ================= */}

        <section className="sports-grid">
          {sports.map((sport, index) => (
            <Link
              href="/sport"
              className={`sport-card ${
                index === 0 ? "featured" : ""
              }`}
              key={sport.name}
            >

              {/* IMAGE */}

              <div className="sport-image-wrap">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  priority={index < 2}
                  className="sport-image"
                  sizes="
                    (max-width: 650px) 100vw,
                    (max-width: 1000px) 50vw,
                    33vw
                  "
                />
              </div>

              {/* CONTENT */}

              <div className="sport-content">
                <div className="sport-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2 className="sport-name">
                  {sport.name}
                </h2>

                <p className="sport-description">
                  {sport.description}
                </p>
              </div>

              {/* ARROW */}

              <div className="sport-arrow">
                →
              </div>

            </Link>
          ))}
        </section>
    
      </main>
      <Footer/>
    </div>
  );
}