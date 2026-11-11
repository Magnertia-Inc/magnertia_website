import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { COMPANY } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute -top-40 -right-24 size-[520px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 text-left">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-4">
              <LogoMark className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/10 p-2 shadow-lg backdrop-blur-md" />
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">Magnertia Private Limited</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 font-medium">
              {COMPANY.tagline}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-white/60">
              We create smart EV charging solutions that make charging easier, faster, and more convenient for everyone.
            </p>
          </div>

          <div className="flex flex-col items-start text-left">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
              Contact Info
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm text-white/85 text-left">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-accent" />
                <div className="leading-relaxed text-xs sm:text-sm">
                  <p>585/18/2, Lakshminagar, Kottakadu, Pallipalayam.</p>
                  <p>Namakkal-638008.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4.5 shrink-0 text-accent" />
                <a href={`tel:${COMPANY.phone}`} className="transition-colors hover:text-accent font-medium">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4.5 shrink-0 text-accent" />
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-accent font-medium">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="size-4.5 shrink-0 text-accent" />
                <a href={`https://${COMPANY.website}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent font-medium">
                  {COMPANY.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between text-left">
          <p>
            © {new Date().getFullYear()} Magnertia Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
