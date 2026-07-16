"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, type Column } from "@/components/shared/DataTable";

type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  message: string;
  status: string;
};

const STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Converted", "Lost"];

export function LeadsTable() {
  const [refreshKey, setRefreshKey] = useState(0);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast.error("Failed to update lead.");
      return;
    }
    toast.success("Lead updated.");
    setRefreshKey((k) => k + 1);
  };

  const columns: Column<LeadRow>[] = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "source", label: "Source" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Select value={row.status} onValueChange={(v) => updateStatus(row.id, v)}>
          <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      ),
    },
  ];

  return (
    <DataTable<LeadRow>
      endpoint="/api/leads"
      columns={columns}
      filters={[{ key: "status", label: "Status", options: STATUS_OPTIONS }]}
      searchPlaceholder="Search by name, email or phone…"
      exportFilename="leads.csv"
      rowKey={(row) => row.id}
      refreshKey={refreshKey}
    />
  );
}
