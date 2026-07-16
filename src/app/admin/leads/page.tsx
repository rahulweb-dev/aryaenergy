import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { LeadsTable } from "@/components/sections/admin/LeadsTable";

export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };

export default function AdminLeadsPage() {
  return (
    <>
      <AdminPageHeader title="Leads" description="Sales pipeline generated from the contact form and other sources." />
      <div className="grid gap-6 p-4 md:p-6">
        <LeadsTable />
      </div>
    </>
  );
}
