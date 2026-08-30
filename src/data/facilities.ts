/* ============================================================
   FACILITIES DATA (mock — mirrors the survey design)
   ============================================================ */

export type FacilityStatus = "ok" | "busy" | "closed" | "hold";

export type Facility = {
  name: string;
  location: string;
  status: FacilityStatus;
  note: string;
};

export const facilities: Facility[] = [
  { name: "SAC Football Ground", location: "Plot 04 · Outdoor", status: "ok", note: "Open · slots today" },
  { name: "Swimming Pool Complex", location: "Plot 11 · Aquatic", status: "ok", note: "Open · 6–9 AM" },
  { name: "Multipurpose Hall", location: "Plot 07 · Indoor", status: "busy", note: "Booked till 8 PM" },
  { name: "Main Cricket Ground", location: "Plot 02 · Outdoor", status: "hold", note: "Reserved · Inter-IIT" },
  { name: "Tennis Courts", location: "Plot 05 · Outdoor", status: "ok", note: "Open · 5–7 PM" },
  { name: "Athletics Track", location: "Plot 01 · Outdoor", status: "ok", note: "Open · all day" },
  { name: "Squash Courts", location: "Plot 12 · Indoor", status: "busy", note: "Booked · 6 PM" },
  { name: "TT Hall", location: "Plot 13 · Indoor", status: "ok", note: "Open · 4–9 PM" },
  { name: "Hockey Astro Turf", location: "Plot 09 · Outdoor", status: "closed", note: "Closed · maintenance" },
];

export const statusMeta: Record<
  FacilityStatus,
  { cls: string; glyph: string; label: string; color: string }
> = {
  ok: { cls: "st-ok", glyph: "△", label: "Available", color: "var(--ok)" },
  busy: { cls: "st-busy", glyph: "▣", label: "Booked", color: "var(--busy)" },
  closed: { cls: "st-closed", glyph: "▣", label: "Closed", color: "var(--closed)" },
  hold: { cls: "st-hold", glyph: "▲", label: "Reserved", color: "var(--hold)" },
};
