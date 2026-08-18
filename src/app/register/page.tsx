import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { centers, registration } from "@/constants/site-content";
import { ExternalLink, MapPin, ShieldCheck, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Register",
  description: "Start your vehicle registration or RTO application on the official Parivahan portal.",
  openGraph: { title: "Register — ATS India", url: "/register" },
  alternates: { canonical: "/register" },
};

const steps = [
  { icon: FileText, title: "Choose your service", desc: "Vehicle registration, renewal, transfer of ownership, or any other RTO application." },
  { icon: ShieldCheck, title: "Apply on Parivahan", desc: "You're redirected to the Government of India's official portal — the same system every RTO uses." },
  { icon: Clock, title: "Visit your centre", desc: "Bring your application reference and documents to any centre below to complete verification and testing." },
];

export default function Register() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Registration"
        title="Register your vehicle online."
        subtitle="Applications are processed directly through the Government of India's Parivahan portal, then completed in person at your nearest centre."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <FadeIn>
          <div className="glass shadow-soft rounded-3xl p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{registration.label}</div>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Start your application</h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">{registration.desc}</p>
              </div>
              <Button asChild size="lg" className="gradient-brand shrink-0 text-white shadow-elevated hover:opacity-95">
                <a href={registration.url} target="_blank" rel="noreferrer">
                  Go to Parivahan <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{s.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Complete it at a centre near you</h2>
            <p className="mt-3 max-w-2xl text-white/70">Once your online application is submitted, visit any of our RTO centres to finish verification.</p>
          </FadeIn>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {centers.map((c) => (
              <div key={c.slug} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-white">{c.name}</div>
                  <div className="text-xs text-white/60">{c.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
