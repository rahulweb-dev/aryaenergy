import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { BookingsTable } from "@/components/sections/admin/BookingsTable";

export const metadata: Metadata = { title: "Bookings", robots: { index: false, follow: false } };

export default function AdminBookingsPage() {
  return (
    <>
      <AdminPageHeader title="Bookings" description="Manage appointments, update status and results." />
      <div className="grid gap-6 p-4 md:p-6">
        <BookingsTable />
      </div>
    </>
  );
}
