import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { centers } from "@/constants/site-content";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Locations",
  description: "Automated testing stations across Delhi NCR, Mumbai, Bengaluru and Hyderabad.",
  openGraph: { title: "Locations — ATS India", url: "/locations" },
  alternates: { canonical: "/locations" },
};

export default function Locations() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Locations" title="Find your nearest ATS lane." subtitle="Every centre runs the same equipment, the same SOP and the same tolerances." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6">
        {centers.map((c) => (
          <FadeIn key={c.name}>
            <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-56 gradient-hero">
                <div className="absolute inset-0 grid place-items-center text-primary/40">
                  <MapPin className="h-16 w-16" />
                </div>
                <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-secondary backdrop-blur">
                  Map placeholder
                </div>
              </div>
              <div className="p-6">
                <div className="font-display text-xl font-semibold">{c.name}</div>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {c.address}</li>
                  <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {c.phone}</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {c.hours}</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm" className="gradient-brand text-white"><Navigation className="mr-1 h-3.5 w-3.5" /> Directions</Button>
                  <Button size="sm" variant="outline">Book here</Button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SiteLayout>
  );
}
