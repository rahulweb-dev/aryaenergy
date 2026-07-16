import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMonthlyReport } from "./queries";

export const metadata: Metadata = { title: "Reports", robots: { index: false, follow: false } };

export default async function ReportsPage() {
  const rows = await getMonthlyReport();

  return (
    <>
      <AdminPageHeader title="Reports" description="Monthly booking and testing outcome summary." />
      <div className="grid gap-6 p-4 md:p-6">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Total Bookings</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Passed</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Pass Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    No data yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => {
                  const rate = r.passed + r.failed > 0 ? Math.round((r.passed / (r.passed + r.failed)) * 100) : 0;
                  return (
                    <TableRow key={r.month}>
                      <TableCell>{r.month}</TableCell>
                      <TableCell>{r.total}</TableCell>
                      <TableCell>{r.completed}</TableCell>
                      <TableCell className="text-success">{r.passed}</TableCell>
                      <TableCell className="text-destructive">{r.failed}</TableCell>
                      <TableCell>{rate}%</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
