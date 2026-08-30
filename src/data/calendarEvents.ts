/* ============================================================
   CALENDAR EVENTS — season plan (mock, mirrors the design)
   Dates are inclusive ranges (s = start, e = end), ISO yyyy-mm-dd.
   ============================================================ */

export type CalendarCategory =
  | "Tournament"
  | "Run"
  | "Fitness"
  | "Yoga"
  | "Academic";

export type CalendarEvent = {
  s: string;
  e: string;
  t: string;
  c: CalendarCategory;
  n?: string;
};

export const calendarEvents: CalendarEvent[] = [
  { s: "2026-01-20", e: "2026-03-29", t: "Inter-Bhawan Tournament", c: "Tournament", n: "Inter-bhawan championship across all sports" },
  { s: "2026-01-25", e: "2026-02-15", t: "Institute Open Tournament", c: "Tournament", n: "Open to all students" },
  { s: "2026-01-25", e: "2026-01-25", t: "Cyclothon", c: "Run", n: "Sunday campus cycle ride" },
  { s: "2026-03-15", e: "2026-03-15", t: "Half Marathon", c: "Run", n: "Campus half marathon" },
  { s: "2026-03-23", e: "2026-03-29", t: "Colours Trophy", c: "Tournament", n: "Season finale tournament" },
  { s: "2026-04-20", e: "2026-04-23", t: "NSO Fitness Test", c: "Fitness", n: "National Sports Organisation assessment" },
  { s: "2026-04-25", e: "2026-04-26", t: "Valedictory Function", c: "Fitness", n: "Sports awards and closing ceremony" },
  { s: "2026-06-16", e: "2026-06-21", t: "International Yoga Day", c: "Yoga", n: "Yoga sessions for the campus community" },
  { s: "2026-02-26", e: "2026-03-03", t: "Mid-term Examination", c: "Academic", n: "No fixtures scheduled" },
  { s: "2026-03-04", e: "2026-03-08", t: "Mid-term Break", c: "Academic", n: "" },
  { s: "2026-04-30", e: "2026-04-30", t: "Last Date of Teaching", c: "Academic", n: "" },
  { s: "2026-05-02", e: "2026-05-11", t: "End-term Examination", c: "Academic", n: "No fixtures scheduled" },
];

export const calendarFilters: { key: "all" | CalendarCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Tournament", label: "Tournaments" },
  { key: "Run", label: "Runs" },
  { key: "Fitness", label: "Fitness & NSO" },
  { key: "Yoga", label: "Yoga" },
  { key: "Academic", label: "Academic" },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ---- date helpers (noon avoids DST edge cases) ---- */
export function toDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

export function within(day: Date, ev: CalendarEvent): boolean {
  return day >= toDate(ev.s) && day <= toDate(ev.e);
}

export function rangeLabel(ev: CalendarEvent): string {
  const fmt = (x: Date) => `${x.getDate()} ${MONTHS[x.getMonth()].slice(0, 3)}`;
  const a = toDate(ev.s);
  const b = toDate(ev.e);
  return ev.s === ev.e ? fmt(a) : `${fmt(a)} – ${fmt(b)}`;
}

// Google Calendar "add event" link (opens in a new tab when clicked).
export function gcalLink(ev: CalendarEvent): string {
  const s = ev.s.replace(/-/g, "");
  const end = toDate(ev.e);
  end.setDate(end.getDate() + 1); // gcal end date is exclusive
  const e =
    end.getFullYear() +
    `0${end.getMonth() + 1}`.slice(-2) +
    `0${end.getDate()}`.slice(-2);
  return (
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent(`IITR: ${ev.t}`) +
    `&dates=${s}/${e}&details=` +
    encodeURIComponent(ev.n || "")
  );
}
