import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { ChartSkeleton } from "@/components/shared/ChartSkeleton";
import { getAnalytics } from "./queries";

const CategoryVolumeChart = dynamic(
  () => import("@/components/sections/admin/DashboardCharts").then((m) => m.CategoryVolumeChart),
  { loading: () => <ChartSkeleton height={240} /> },
);
const DistributionChart = dynamic(
  () => import("@/components/sections/admin/DashboardCharts").then((m) => m.DistributionChart),
  { loading: () => <ChartSkeleton /> },
);

export const metadata: Metadata = { title: "Analytics", robots: { index: false, follow: false } };

export default async function AnalyticsPage() {
  const { byFuel, byStatus } = await getAnalytics();

  return (
    <>
      <AdminPageHeader title="Analytics" description="Fuel type and status distribution across all bookings." />
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
          <div className="mb-4 font-semibold">Bookings by Fuel Type</div>
          <CategoryVolumeChart data={byFuel} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
          <div className="mb-4 font-semibold">Bookings by Status</div>
          <DistributionChart data={byStatus} />
        </div>
      </div>
    </>
  );
}
