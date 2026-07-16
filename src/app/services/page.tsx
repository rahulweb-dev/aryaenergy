import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { services, images } from "@/constants/site-content";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Brake, suspension, emission, headlight, speedometer, side-slip, undercarriage and noise testing — all automated.",
  openGraph: { title: "Services — ATS India", url: "/services" },
  alternates: { canonical: "/services" },
};

const imageBySlug: Record<string, string> = {
  brake: images.brake,
  suspension: images.suspension,
  emission: images.emission,
  headlight: images.headlight,
  noise: images.noise,
  inspection: images.inspection,
  speedometer: images.control,
  sideslip: images.lane,
};

export default function Services() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="Every parameter in the CMVR playbook."
        subtitle="Each test lane runs the same eight measurements, in the same order, to the same MoRTH-certified tolerances — every single time."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-16">
          {services.map((s, i) => (
            <FadeIn key={s.slug}>
              <div id={s.slug} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative h-80 w-full overflow-hidden rounded-3xl shadow-elevated">
                  <Image
                    src={imageBySlug[s.slug]}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold md:text-4xl">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                  <ul className="mt-6 grid gap-2 text-sm">
                    {["Automated, tamper-proof measurement", "Calibrated to NABL standards", "Real-time VAHAN upload", "Digital PDF + QR record"].map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
