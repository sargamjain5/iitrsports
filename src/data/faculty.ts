/* ============================================================
   SPORTS FACULTY & STAFF
   Source: official Institute Sports Council staff page
   (https://iitr.ac.in/Campus Life/Sports/staff.html) — names,
   designations, emails, phones and photos pulled from that page.
   Obvious typos (e.g. "Instructure") normalised to "Instructor".
   ============================================================ */

export type FacultyMember = {
  name: string;
  role: string;
  photo?: string;
  email?: string;
  phone?: string;
  campus?: string;
};

export type FacultyGroup = {
  title: string;
  blurb: string;
  members: FacultyMember[];
};

export const facultyGroups: FacultyGroup[] = [
  {
    title: "Institute Sports Council",
    blurb: "Faculty leadership overseeing sport across the campus.",
    members: [
      {
        name: "Prof. Bhanu Prakash V",
        role: "Chairman, ISC",
        photo: "/faculty/bhanu.jpg",
        email: "chairman.isc@iitr.ac.in",
        phone: "9557228965",
      },
      {
        name: "Prof. Nikhil Saboo",
        role: "Faculty Advisor",
        photo: "/faculty/nikhil.jpg",
        email: "sports@iitr.ac.in",
        phone: "7579048967",
      },
    ],
  },
  {
    title: "Sports Office",
    blurb: "Officers and instructors running day-to-day sport at IIT Roorkee.",
    members: [
      {
        name: "Dr. Alok Kr. Pandey",
        role: "Sports Officer",
        photo: "/faculty/alok.jpg",
        email: "sports.officer@iitr.ac.in",
        phone: "9897036399",
      },
      {
        name: "Dr. Mukesh Choudhary",
        role: "Asstt. Sports Officer (S.S.)",
        photo: "/faculty/mukesh.jpg",
        email: "mukesh.msc2017@iitr.ac.in",
        phone: "9450857716",
      },
      {
        name: "Dr. Pramod Kumar",
        role: "Asstt. Sports Officer",
        photo: "/faculty/pramod.jpg",
        email: "pramod.msa@iitr.ac.in",
        phone: "9560768286",
      },
      {
        name: "Dr. Ashish Yadav",
        role: "Asstt. Sports Officer (S.S.)",
        photo: "/faculty/ashish.jpg",
        email: "ashish.msc2018@iitr.ac.in",
        phone: "7987358973",
      },
      {
        name: "Dr. Hema Pant",
        role: "Senior Physical Training Instructor (S.G.)",
        photo: "/faculty/hema-pant.jpg",
        email: "hemapant.msa2018@iitr.ac.in",
        phone: "9897422624",
      },
      {
        name: "Smt. Suchitra Rahi",
        role: "Senior Physical Training Instructor (SG)",
        photo: "/faculty/suchitra.png",
        email: "srahi.sre@iitr.ac.in",
        phone: "8299196959",
        campus: "Saharanpur Campus",
      },
    ],
  },
  {
    title: "Coaches",
    blurb: "Sport-specific coaching staff working with the teams.",
    members: [
      {
        name: "Dr. Shanu Chopra",
        role: "Coach · Athletics",
        photo: "/faculty/shanu.jpg",
        email: "shanu.msa@iitr.ac.in",
        phone: "9999894596",
      },
      {
        name: "Sri Wasim Akram",
        role: "Coach · Hockey",
        photo: "/faculty/wasim.jpg",
        email: "wakram.msa2019@iitr.ac.in",
        phone: "9616105868",
      },
      {
        name: "Sri Rahul Prakash Keshri",
        role: "Coach · Table Tennis",
        photo: "/faculty/rahul.jpg",
        email: "rahul.msa@iitr.ac.in",
        phone: "7677483154",
      },
      {
        name: "Dr. Hema Koranga",
        role: "Coach · Badminton",
        photo: "/faculty/hema-koranga.jpg",
        email: "hema.msa@iitr.ac.in",
        phone: "7000839807",
      },
      {
        name: "Sri Prakash Boro",
        role: "Coach · Swimming",
        photo: "/faculty/prakash.jpg",
        email: "prakash.msa@iitr.ac.in",
        phone: "7002671727",
      },
      {
        name: "Sri Laxman Singh Yadav",
        role: "Coach Gr.-I",
        photo: "/faculty/laxman.jpg",
        email: "laxman.msa2018@iitr.ac.in",
        phone: "7017515408",
      },
    ],
  },
  {
    title: "Office & Ground Staff",
    blurb: "The support team keeping facilities and grounds running.",
    members: [
      {
        name: "Sri Vikash Tyagi",
        role: "Senior Superintendent",
        photo: "/faculty/vikash.jpg",
        email: "vtyagi.mso@iitr.ac.in",
        phone: "9458353565",
      },
      {
        name: "Sri Rajendra Singh",
        role: "Attendant",
        photo: "/faculty/rajendra.jpg",
        email: "iitrrajendra@gmail.com",
        phone: "7505503488",
      },
      {
        name: "Sri Ramesh III",
        role: "Attendant",
        photo: "/faculty/ramesh.jpg",
        email: "rameshitwari@gmail.com",
      },
      {
        name: "Sri Vijaypal",
        role: "Z-Pool Staff",
        photo: "/faculty/vijaypal.png",
        phone: "7409443898",
      },
      {
        name: "Sri Sayeed Ahmad",
        role: "Y-Pool Staff (Mustrol)",
        photo: "/faculty/sayeed.jpg",
        phone: "9358881778",
      },
    ],
  },
];

// initials for the avatar fallback (strips honorifics like Prof./Dr./Sri/Smt.)
export function initials(name: string): string {
  const parts = name
    .replace(/^(Prof\.?|Dr\.?|Sri|Smt\.?|Shri)\s+/i, "")
    .trim()
    .split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
