import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { centers, registration } from "@/constants/site-content";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Locations",
  description: "ATS India testing centres at Regional Transport Office (RTO) locations across Maharashtra.",
  openGraph: { title: "Locations — ATS India", url: "/locations" },
  alternates: { canonical: "/locations" },
};

export default function Locations() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Locations"
        title="10 centres. Every RTO you need."
        subtitle="Every centre runs the same equipment, the same SOP and the same tolerances."
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6">
        {centers.map((c) => {
          const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
          const cover = c.photos[0];
          const thumbs = c.photos.slice(1, 5);
          const extraCount = c.photos.length - 1 - thumbs.length;

          return (
            <FadeIn key={c.slug}>
              <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <div className="relative min-h-56 gradient-hero">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={`${c.name} testing centre`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-primary/40">
                      <MapPin className="h-16 w-16" />
                    </div>
                  )}
                </div>

                {thumbs.length > 0 && (
                  <div className="grid grid-cols-4 gap-1 bg-muted p-1">
                    {thumbs.map((src, i) => {
                      const isLast = i === thumbs.length - 1 && extraCount > 0;
                      return (
                        <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={src}
                            alt={`${c.name} photo ${i + 2}`}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                          {isLast && (
                            <div className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-semibold text-white">
                              +{extraCount}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="p-6">
                  <div className="font-display text-xl font-semibold">{c.name}</div>
                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {c.address}</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button asChild size="sm" className="gradient-brand text-white">
                      <a href={mapsHref} target="_blank" rel="noreferrer">
                        <Navigation className="mr-1 h-3.5 w-3.5" /> Directions
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={registration.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1 h-3.5 w-3.5" /> Register Online
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SiteLayout>
  );
}
