import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-secondary bg-chart-2 md:bg-gradient-to-r from-chart-3 to-chart-2">
      {/* main */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand / contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/Gadme.png" alt="gadme-logo" className="h-9 w-9" />
              <h1 className="text-xl font-semibold">GadMe</h1>
            </div>

            <div className="space-y-1 text-sm/6">
              <p className="font-medium">Customer Support</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(629) 555-0129</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-1" />
                <span>
                  4517 Washington Ave.
                  <br />
                  Manchester, Kentucky 39495
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@gadme.com" className="hover:underline">
                  info@gadme.com
                </a>
              </p>
            </div>

            {/* social */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:opacity-80 transition-opacity"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* map */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Our Location</h3>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="w-full aspect-video">
                <iframe
                  title="Map"
                  src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  className="h-full w-full block border-0"
                />
              </div>
            </div>
          </div>

          {/* top category */}
          <div>
            <h2 className="font-semibold mb-3">Top Category</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Computer & Laptop
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  SmartPhone
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Headphone
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Camera & Photo
                </a>
              </li>
            </ul>
          </div>

          {/* quick links */}
          <div>
            <h2 className="font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Camera & Photo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-xs md:text-sm opacity-80 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} GadMe. All rights reserved.</p>
          <p className="text-center">
            Built with ❤️ — <span className="opacity-80">Bangkok</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
