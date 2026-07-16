import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Calendar, CheckCircle2, TrendingUp, XCircle, type LucideIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { Counter } from "@/components/shared/motion";
import { ChartSkeleton } from "@/components/shared/ChartSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardStats } from "./queries";

const BookingTrendChart = dynamic(
  () => import("@/components/sections/admin/DashboardCharts").then((m) => m.BookingTrendChart),
  { loading: () => <ChartSkeleton /> },
);
const PassFailChart = dynamic(
  () => import("@/components/sections/admin/DashboardCharts").then((m) => m.PassFailChart),
  { loading: () => <ChartSkeleton /> },
);
const CategoryVolumeChart = dynamic(
  () => import("@/components/sections/admin/DashboardCharts").then((m) => m.CategoryVolumeChart),
  { loading: () => <ChartSkeleton height={240} /> },
);

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default function AdminDashboard() {
  return (
    <>
      <AdminPageHeader title="Dashboard" description="Live overview of bookings, testing volume and pass rate." />
      <div className="grid gap-6 p-4 md:p-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </>
  );
}

async function DashboardContent() {
  const stats = await getDashboardStats();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        <Kpi icon={Calendar} label="Today's Bookings" value={stats.todaysBookings} />
        <Kpi icon={CheckCircle2} label="Vehicles Tested" value={stats.vehiclesTested} />
        <Kpi icon={TrendingUp} label="Pass Rate" value={stats.passRate} suffix="%" />
        <Kpi icon={XCircle} label="Failed Tests" value={stats.failed} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card title="Booking Trend (by month)">
          <BookingTrendChart data={stats.trend} />
        </Card>
        <Card title="Pass / Fail Analysis">
          <PassFailChart passed={stats.passed} failed={stats.failed} />
        </Card>
      </div>

      <Card title="Testing Volume by Category">
        <CategoryVolumeChart data={stats.byCategory} />
      </Card>

      <Card title="Recent Bookings">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recent.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No bookings yet.
                  </TableCell>
                </TableRow>
              ) : (
                stats.recent.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.reference}</TableCell>
                    <TableCell>{b.ownerName}</TableCell>
                    <TableCell>{b.vehicleNumber}</TableCell>
                    <TableCell className="text-muted-foreground">{b.date}</TableCell>
                    <TableCell><StatusChip status={b.status} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Skeleton className="h-[280px] rounded-2xl" />
        <Skeleton className="h-[280px] rounded-2xl" />
      </div>
      <Skeleton className="h-[240px] rounded-2xl" />
    </>
  );
}

function Kpi({ icon: Icon, label, value, suffix = "" }: { icon: LucideIcon; label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-semibold">
        <Counter to={value} suffix={suffix} />
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-primary/10 text-primary",
    "In Progress": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    Failed: "bg-destructive/15 text-destructive",
    Scheduled: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>{status}</span>;
}
