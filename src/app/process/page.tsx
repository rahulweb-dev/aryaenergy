import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { ArrowRight, ClipboardCheck, FileCheck2, ScanLine, Award, Car, ShieldCheck } from "lucide-react";
import { Glossed } from "@/components/shared/Glossary";

export const metadata: Metadata = {
  title: "Testing Process",
  description: "See how a vehicle moves from gate to certificate in under 15 minutes.",
  openGraph: { title: "Testing Process — ATS India", url: "/process" },
  alternates: { canonical: "/process" },
};

const steps = [
  { icon: Car,              t: "Vehicle Arrival",       d: "Drive-in at your booked slot. QR-scan check-in at the gate." },
  { icon: ClipboardCheck,   t: "Document Verification", d: "RC, insurance, PUC, and tax verified automatically via VAHAN." },
  { icon: FileCheck2,       t: "Vehicle Registration",  d: "Lane assigned, chassis auto-recognised by ANPR camera." },
  { icon: ScanLine,         t: "Automated Testing",     d: "Eight sensor-driven tests run in sequence — no operator input." },
  { icon: ShieldCheck,      t: "Quality Check",         d: "Central server validates results against MoRTH tolerances." },
  { icon: Award,            t: "Fitness Certificate",   d: "Digital certificate + QR issued to WhatsApp and VAHAN." },
];

export default function Process() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Testing process"
        title="Gate to certificate in under 15 minutes."
        subtitle="Every vehicle follows the same six-stage sequence — deterministic, auditable, tamper-proof."
      />
      <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <ol className="relative border-l border-border pl-8">
          {steps.map((s, i) => (
            <FadeIn key={s.t} delay={i * 0.05}>
              <li className="relative mb-10">
                <span className="absolute -left-[42px] top-1 grid h-10 w-10 place-items-center rounded-full gradient-brand text-white shadow-elevated">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="glass shadow-soft rounded-2xl p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Step {i + 1}</div>
                  <div className="mt-1 text-xl font-semibold">{s.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground"><Glossed text={s.d} /></p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="my-2 ml-2 h-4 w-4 text-primary" />
                )}
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </SiteLayout>
  );
}
