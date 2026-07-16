import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { pricing } from "@/constants/site-content";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, state-notified pricing for two-wheeler, car, commercial and heavy vehicle fitness testing.",
  openGraph: { title: "Pricing — ATS India", url: "/pricing" },
  alternates: { canonical: "/pricing" },
};

export default function Pricing() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pricing"
        title="Transparent, notified, no surprises."
        subtitle="Fees follow the state transport authority's published schedule. What you see is what you pay."
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        {pricing.map((p) => (
          <FadeIn key={p.title}>
            <div className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-soft transition-all hover:-translate-y-1 ${
              p.highlight ? "border-primary bg-secondary text-white" : "border-border bg-card"
            }`}>
              {p.highlight && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1 text-xs font-medium text-white shadow-elevated">
                  <Sparkles className="h-3 w-3" /> Most popular
                </div>
              )}
              <div className="text-sm font-semibold uppercase tracking-widest opacity-70">{p.title}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">₹{p.price.toLocaleString("en-IN")}</span>
                <span className="text-sm opacity-70">/ test</span>
              </div>
              <ul className="mt-6 grid gap-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`mt-8 ${p.highlight ? "bg-white text-primary hover:bg-white/90" : "gradient-brand text-white"}`}>
                <Link href="/book">Book now</Link>
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </SiteLayout>
  );
}
