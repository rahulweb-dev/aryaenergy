"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, type Column } from "@/components/shared/DataTable";

type BookingRow = {
  id: string;
  reference: string;
  ownerName: string;
  phone: string;
  email: string;
  vehicleNumber: string;
  vehicleType: string;
  fuel: string;
  date: string;
  slot: string;
  status: string;
  result: string;
};

const STATUS_OPTIONS = ["Scheduled", "In Progress", "Completed", "Failed"];
const RESULT_OPTIONS = ["Pending", "Passed", "Failed"];

export function BookingsTable() {
  const [refreshKey, setRefreshKey] = useState(0);

  const updateBooking = async (id: string, patch: Record<string, string>) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      toast.error("Failed to update booking.");
      return;
    }
    toast.success("Booking updated.");
    setRefreshKey((k) => k + 1);
  };

  const columns: Column<BookingRow>[] = [
    { key: "reference", label: "Ref" },
    { key: "ownerName", label: "Customer" },
    { key: "vehicleNumber", label: "Vehicle" },
    { key: "date", label: "Date" },
    { key: "slot", label: "Slot" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Select value={row.status} onValueChange={(v) => updateBooking(row.id, { status: v })}>
          <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "result",
      label: "Result",
      render: (row) => (
        <Select value={row.result} onValueChange={(v) => updateBooking(row.id, { result: v })}>
          <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {RESULT_OPTIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      ),
    },
  ];

  return (
    <DataTable<BookingRow>
      endpoint="/api/bookings"
      columns={columns}
      filters={[{ key: "status", label: "Status", options: STATUS_OPTIONS }]}
      searchPlaceholder="Search by reference, customer, vehicle or phone…"
      exportFilename="bookings.csv"
      rowKey={(row) => row.id}
      refreshKey={refreshKey}
    />
  );
}
