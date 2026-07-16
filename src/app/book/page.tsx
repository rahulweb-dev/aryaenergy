import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { BookingForm } from "@/components/forms/BookingForm";
import { CheckCircle2, Calendar as CalendarIcon, Clock, type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Reserve your automated vehicle fitness test slot in 60 seconds.",
  openGraph: { title: "Book Appointment — ATS India", url: "/book" },
  alternates: { canonical: "/book" },
};

export default function Book() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Book appointment"
        title="Reserve your slot in 60 seconds."
        subtitle="You'll receive a confirmation email with your booking reference."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:px-6">
        <FadeIn>
          <BookingForm />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-4">
            <SideCard icon={CalendarIcon} title="Same-day slots" body="Most centres have availability within 2 hours." />
            <SideCard icon={Clock} title="Under 15 minutes" body="Average time from lane entry to certificate." />
            <SideCard icon={CheckCircle2} title="Free re-test" body="Failed a parameter? Fix it and re-test at 50% within 15 days." />
          </div>
        </FadeIn>
      </div>
    </SiteLayout>
  );
}

function SideCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="glass shadow-soft rounded-2xl p-5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
