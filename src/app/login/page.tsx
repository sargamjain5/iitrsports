"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/survey/PageShell";
import Reveal from "@/components/survey/Reveal";

/* ============================================================
   LOGIN / SIGN UP — tabbed access card (demo, no auth backend)
   ============================================================ */

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/my-bookings");
  };

  return (
    <PageShell>
      <section style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div
          className="wrap"
          style={{ maxWidth: 460, marginInline: "auto", width: "100%" }}
        >
          <Reveal className="eyebrow" style={{ textAlign: "center", marginBottom: 14 }}>
            Student / athlete access
          </Reveal>
          <Reveal
            as="h1"
            className="title"
            style={{
              fontSize: "clamp(34px,7vw,56px)",
              textAlign: "center",
              marginBottom: 26,
            }}
          >
            Sign in
          </Reveal>

          <Reveal className="form-card">
            <div className="tabs" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className={`tab-btn ${tab === "login" ? "active" : ""}`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`tab-btn ${tab === "signup" ? "active" : ""}`}
                onClick={() => setTab("signup")}
              >
                Sign up
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={go}>
                <div className="field">
                  <label>Institute email</label>
                  <input type="email" placeholder="you@iitr.ac.in" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Login
                </button>
                <div
                  className="muted"
                  style={{ fontSize: 12, textAlign: "center", marginTop: 14 }}
                >
                  Manage bookings · view history · get notifications
                </div>
              </form>
            ) : (
              <form onSubmit={go}>
                <div className="field">
                  <label>Full name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label>Institute email</label>
                  <input type="email" placeholder="you@iitr.ac.in" required />
                </div>
                <div className="field">
                  <label>Bhawan / Dept</label>
                  <input type="text" placeholder="e.g. Rajendra Bhawan" required />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="Create a password" required />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Create account
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
