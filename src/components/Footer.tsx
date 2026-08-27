import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">

          {/* BRAND */}
          <div>
            <Link href="/" className="brand footer-brand">
              IIT Roorkee Sports
            </Link>

            <p className="about">
              The home of sport at IIT Roorkee - fixtures, facilities,
              results and archives, all in one place.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h4>Explore</h4>

            <Link href="/sports">Sports</Link>
            <Link href="/facilities">Facilities</Link>
            <Link href="/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
          </div>

          {/* BOOKING */}
          <div>
            <h4>Booking</h4>

            <Link href="/booking">Turf Booking</Link>
            <Link href="/my-bookings">My Bookings</Link>
            <Link href="/login">Login</Link>
          </div>

          {/* MORE */}
          <div>
            <h4>More</h4>

            <Link href="/achievements">Achievements</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/feedback">Feedback</Link>
          </div>

        </div>

        <div className="foot-bottom">
          <span>© 2026 IIT Roorkee · Sports Section</span>
        </div>
      </div>
    </footer>
  );
}