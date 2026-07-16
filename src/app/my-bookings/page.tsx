import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { MyBookingsClient } from "@/components/forms/MyBookingsClient";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View and reschedule your automated vehicle fitness test appointments.",
  openGraph: { title: "My Bookings — ATS India", url: "/my-bookings" },
  alternates: { canonical: "/my-bookings" },
};

export default function MyBookings() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="My bookings"
        title="Manage your appointments."
        subtitle="Enter the mobile number used at booking to view and reschedule your upcoming tests."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <MyBookingsClient />
      </div>
    </SiteLayout>
  );
}
