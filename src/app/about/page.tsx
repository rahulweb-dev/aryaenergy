import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { images } from "@/constants/site-content";
import { ShieldCheck, Target, Eye, Cog, type LucideIcon } from "lucide-react";
import { Glossed } from "@/components/shared/Glossary";

export const metadata: Metadata = {
  title: "About",
  description: "ATS India runs MoRTH-accredited automated vehicle fitness testing stations across 10 cities.",
  openGraph: { title: "About — ATS India", url: "/about" },
  alternates: { canonical: "/about" },
};

const timeline = [
  { y: "2019", t: "Founded", d: "ATS India incorporated with a mission to modernise vehicle fitness in India." },
  { y: "2021", t: "First lane", d: "Delhi NCR flagship centre opens with MoRTH accreditation." },
  { y: "2023", t: "VAHAN Live", d: "Real-time integration with the Government of India's VAHAN portal." },
  { y: "2025", t: "10 cities", d: "Nationwide network of 15 automated testing lanes across 10 cities." },
];

export default function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About us"
        title="Modernising vehicle fitness for a billion Indians."
        subtitle="We build the sensors, software and lanes that make road-worthiness testing transparent, fast and impossible to fudge."
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 md:grid-cols-2 md:px-6">
        <FadeIn>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-elevated md:aspect-auto md:h-full">
            <Image
              src={images.facility}
              alt="Facility"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-6">
            <Block icon={Target} title="Mission" body="Eliminate human bias from vehicle fitness certification so India's roads become measurably safer every year." />
            <Block icon={Eye}    title="Vision"  body="A future where every vehicle on Indian roads carries a live, verifiable, tamper-proof fitness record." />
            <Block icon={Cog}    title="Testing Technology" body="EUSAMA suspension plates, MAHA roller brake benches, BS-VI PUC analysers and AI underbody imaging — all calibrated by NABL labs." />
            <Block icon={ShieldCheck} title="Government Compliance" body="Accredited by MoRTH under CMVR Rule 175 and integrated with VAHAN for automated data transfer." />
          </div>
        </FadeIn>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Our journey</h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {timeline.map((e, i) => (
              <FadeIn key={e.y} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="font-display text-3xl font-semibold text-white">{e.y}</div>
                  <div className="mt-3 text-sm font-semibold text-white">{e.t}</div>
                  <p className="mt-1 text-sm text-white/70"><Glossed text={e.d} /></p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <FadeIn>
          <h2 className="mb-8 text-3xl font-semibold md:text-4xl">Gallery</h2>
        </FadeIn>
        <div className="grid gap-4 md:grid-cols-3">
          {[images.lane, images.control, images.inspection, images.brake, images.emission, images.certificate].map((src) => (
            <FadeIn key={src}>
              <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform hover:scale-[1.02]"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="glass shadow-soft rounded-2xl p-6">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground"><Glossed text={body} /></p>
    </div>
  );
}
