import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { VehiclesTable } from "@/components/sections/admin/VehiclesTable";

export const metadata: Metadata = { title: "Vehicles", robots: { index: false, follow: false } };

export default function AdminVehiclesPage() {
  return (
    <>
      <AdminPageHeader title="Vehicles" description="Registry of vehicles seen at ATS India testing lanes." />
      <div className="grid gap-6 p-4 md:p-6">
        <VehiclesTable />
      </div>
    </>
  );
}
