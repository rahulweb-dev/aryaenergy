import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { TrackForm } from "@/components/forms/TrackForm";

export const metadata: Metadata = {
  title: "Track Vehicle Status",
  description: "Track your vehicle's automated fitness testing status in real time.",
  openGraph: { title: "Track — ATS India", url: "/track" },
  alternates: { canonical: "/track" },
};

export default function Track() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Track vehicle"
        title="Live status. Zero calls."
        subtitle="Enter your vehicle or booking reference to see exactly where you are in the pipeline."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <TrackForm />
      </div>
    </SiteLayout>
  );
}
