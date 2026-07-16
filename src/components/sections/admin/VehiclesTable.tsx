"use client";

import { useState } from "react";
import { useForm, Controller, type Control, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { DataTable, type Column } from "@/components/shared/DataTable";

type VehicleRow = {
  id: string;
  vehicleNumber: string;
  type: string;
  fuel: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
};

const vehicleSchema = z.object({
  vehicleNumber: z.string().trim().min(4, "Enter vehicle number"),
  type: z.string().min(1, "Choose a type"),
  fuel: z.string().min(1, "Choose a fuel type"),
  ownerName: z.string().trim().min(2, "Enter owner name"),
  ownerPhone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  ownerEmail: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
});
type VehicleInput = z.infer<typeof vehicleSchema>;

const VEHICLE_TYPES = ["Two Wheeler", "Car", "SUV", "Commercial", "Truck", "Bus", "Electric"];
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"];

export function VehiclesTable() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleInput>({ resolver: zodResolver(vehicleSchema) });

  const onCreate = async (data: VehicleInput) => {
    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Failed to add vehicle.");
      return;
    }
    toast.success("Vehicle added.");
    reset();
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete vehicle.");
      return;
    }
    toast.success("Vehicle removed.");
    setRefreshKey((k) => k + 1);
  };

  const columns: Column<VehicleRow>[] = [
    { key: "vehicleNumber", label: "Vehicle No." },
    { key: "type", label: "Type" },
    { key: "fuel", label: "Fuel" },
    { key: "ownerName", label: "Owner" },
    { key: "ownerPhone", label: "Phone" },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => onDelete(row.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-brand text-white"><Plus className="mr-1 h-4 w-4" /> Add vehicle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add vehicle</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onCreate)} className="grid gap-4">
              <div>
                <Label>Vehicle number</Label>
                <Input className="mt-1.5" {...register("vehicleNumber")} />
                {errors.vehicleNumber && <p className="mt-1 text-xs text-destructive">{errors.vehicleNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField control={control} name="type" label="Type" options={VEHICLE_TYPES} error={errors.type?.message} />
                <SelectField control={control} name="fuel" label="Fuel" options={FUEL_TYPES} error={errors.fuel?.message} />
              </div>
              <div>
                <Label>Owner name</Label>
                <Input className="mt-1.5" {...register("ownerName")} />
                {errors.ownerName && <p className="mt-1 text-xs text-destructive">{errors.ownerName.message}</p>}
              </div>
              <div>
                <Label>Owner phone</Label>
                <Input className="mt-1.5" {...register("ownerPhone")} />
                {errors.ownerPhone && <p className="mt-1 text-xs text-destructive">{errors.ownerPhone.message}</p>}
              </div>
              <div>
                <Label>Owner email (optional)</Label>
                <Input className="mt-1.5" {...register("ownerEmail")} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="gradient-brand text-white">
                  {isSubmitting ? "Adding…" : "Add vehicle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable<VehicleRow>
        endpoint="/api/vehicles"
        columns={columns}
        searchPlaceholder="Search by vehicle number, owner or phone…"
        exportFilename="vehicles.csv"
        rowKey={(row) => row.id}
        refreshKey={refreshKey}
      />
    </div>
  );
}

function SelectField({
  control, name, label, options, error,
}: {
  control: Control<VehicleInput>;
  name: FieldPath<VehicleInput>;
  label: string;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={field.value as string} onValueChange={field.onChange}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
            <SelectContent>
              {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
