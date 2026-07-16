"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { ROLES, ROLE_LABELS } from "@/constants/roles";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
};

const createUserSchema = z.object({
  name: z.string().trim().min(2, "Enter a name"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(ROLES),
});
type CreateUserInput = z.infer<typeof createUserSchema>;

export function UsersTable() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema), defaultValues: { role: "agent" } });

  const onCreate = async (data: CreateUserInput) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      toast.error(body.error ?? "Failed to add user.");
      return;
    }
    toast.success("User added.");
    reset();
    setOpen(false);
    setRefreshKey((k) => k + 1);
  };

  const updateRole = async (id: string, role: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      toast.error("Failed to update role.");
      return;
    }
    toast.success("Role updated.");
    setRefreshKey((k) => k + 1);
  };

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to remove user.");
      return;
    }
    toast.success("User removed.");
    setRefreshKey((k) => k + 1);
  };

  const columns: Column<UserRow>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <Select value={row.role} onValueChange={(v) => updateRole(row.id, v)}>
          <SelectTrigger className="h-8 w-40 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
          </SelectContent>
        </Select>
      ),
    },
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
            <Button size="sm" className="gradient-brand text-white"><Plus className="mr-1 h-4 w-4" /> Add user</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add admin user</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onCreate)} className="grid gap-4">
              <div>
                <Label>Name</Label>
                <Input className="mt-1.5" {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-1.5" {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" className="mt-1.5" {...register("password")} />
                {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <div>
                <Label>Role</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} className="gradient-brand text-white">
                  {isSubmitting ? "Adding…" : "Add user"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable<UserRow>
        endpoint="/api/users"
        columns={columns}
        filters={[{ key: "role", label: "Role", options: [...ROLES] }]}
        searchPlaceholder="Search by name or email…"
        exportFilename="users.csv"
        rowKey={(row) => row.id}
        refreshKey={refreshKey}
      />
    </div>
  );
}
