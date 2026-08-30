/* ============================================================
   HOME FALLBACK DATA
   Served by the API routes when the database / Cloudinary are not
   configured, so the home page renders real content offline
   instead of erroring. Photos reuse the bundled /sports images.
   ============================================================ */

export const mockEvents = [
  {
    _id: "mock-1",
    eventName: "Inter-Bhawan Football Final",
    photo: "/sports/Football.png",
    date: "2026-09-14",
    description:
      "The season finale at SAC Ground — Rajendra face Govind for the inter-bhawan crown.",
  },
  {
    _id: "mock-2",
    eventName: "Inter-IIT Swimming Trials",
    photo: "/sports/SwimmingPool.jpg",
    date: "2026-09-21",
    description:
      "Squad selection heats across freestyle, medley and relay events at the pool complex.",
  },
  {
    _id: "mock-3",
    eventName: "Campus Half Marathon",
    photo: "/sports/Atheletics.png",
    date: "2026-10-05",
    description:
      "21.1 km around campus and the canal — open to all students, staff and alumni.",
  },
];

export const mockGallery = [
  { _id: "g-1", url: "/sports/Football.png" },
  { _id: "g-2", url: "/sports/BasketBall.png" },
  { _id: "g-3", url: "/sports/Hockey.png" },
  { _id: "g-4", url: "/sports/LawnTennis.png" },
  { _id: "g-5", url: "/sports/volleyball.png" },
  { _id: "g-6", url: "/sports/Badminton.png" },
  { _id: "g-7", url: "/sports/Chess.png" },
  { _id: "g-8", url: "/sports/Rowing.png" },
];
