import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ============================================================
   PAGE SHELL
   Standard frame for every "survey" page: shared Navbar, the
   `.sv` scoped content region, and shared Footer.
   ============================================================ */

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="sv">{children}</main>
      <Footer />
    </>
  );
}
