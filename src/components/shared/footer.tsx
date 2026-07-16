import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { brand } from "@/constants/site-content";
import { Glossed } from "@/components/shared/Glossary";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <div className="font-display text-base font-semibold">{brand.short}</div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">{brand.tagline}</p>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Company</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/process" className="hover:text-white">Testing Process</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Services</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/book" className="hover:text-white">Book Appointment</Link></li>
            <li><Link href="/track" className="hover:text-white">Track Vehicle</Link></li>
            <li><Link href="/certificate" className="hover:text-white">Download Certificate</Link></li>
            <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Contact</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-white/60" />{brand.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-white/60" />{brand.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-white/60" />{brand.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:px-6">
          <div>© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div><Glossed text="MoRTH Accredited · VAHAN Integrated · ISO 9001:2015" /></div>
        </div>
      </div>
    </footer>
  );
}
