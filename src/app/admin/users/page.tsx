import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { UsersTable } from "@/components/sections/admin/UsersTable";

export const metadata: Metadata = { title: "Users", robots: { index: false, follow: false } };

export default function AdminUsersPage() {
  return (
    <>
      <AdminPageHeader title="Users" description="Manage admin-panel staff accounts and roles." />
      <div className="grid gap-6 p-4 md:p-6">
        <UsersTable />
      </div>
    </>
  );
}
