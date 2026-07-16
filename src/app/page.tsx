import type { Metadata } from "next";
import { SiteLayout } from "@/components/shared/layout";
import {
  Hero, Stats, Services, HowItWorks, Benefits, Categories, Testimonials, CTA,
} from "@/components/sections/home-sections";

export const metadata: Metadata = {
  title: "ATS India — Automated Vehicle Fitness Testing",
  description:
    "Book a fully automated, VAHAN-integrated vehicle fitness test. 10-minute testing, government-approved, transparent results.",
  openGraph: { title: "ATS India — Automated Vehicle Fitness Testing", url: "/" },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Benefits />
      <Categories />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
