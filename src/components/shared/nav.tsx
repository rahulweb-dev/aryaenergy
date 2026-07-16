"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/constants/site-content";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/locations", label: "Locations" },
  // { to: "/track", label: "Track" },
  // { to: "/my-bookings", label: "My Bookings" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-display">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-brand-foreground shadow-elevated">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">{brand.short}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Testing Services</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="hidden h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent md:grid"
          >
            {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button> */}
          <Button asChild size="sm" className="hidden gradient-brand text-brand-foreground shadow-elevated hover:opacity-95 md:inline-flex">
            <Link href="/book">Book Test</Link>
          </Button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={`rounded-lg px-3 py-2 text-sm ${path === l.to ? "bg-primary/10 text-primary" : "hover:bg-accent"
                  }`}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 gradient-brand text-brand-foreground">
              <Link href="/book">Book Vehicle Test</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
