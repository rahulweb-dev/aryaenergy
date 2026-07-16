import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/shared/AdminPageHeader";
import { ProfileSettingsForm } from "@/components/forms/ProfileSettingsForm";
import { auth } from "@/lib/auth";
import { ROLE_LABELS, type Role } from "@/constants/roles";
import { brand } from "@/constants/site-content";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: false } };

export default async function SettingsPage() {
  const session = await auth();

  return (
    <>
      <AdminPageHeader title="Settings" description="Your admin profile and site information." />
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
          <div className="mb-4 font-semibold">Profile</div>
          <div className="mb-4 grid gap-1 text-sm text-muted-foreground">
            <div>Email: <span className="text-foreground">{session?.user?.email}</span></div>
            <div>Role: <span className="text-foreground">{session?.user?.role ? ROLE_LABELS[session.user.role as Role] : ""}</span></div>
          </div>
          <ProfileSettingsForm defaultName={session?.user?.name ?? ""} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
          <div className="mb-4 font-semibold">Site information</div>
          <div className="grid gap-1 text-sm text-muted-foreground">
            <div>Brand: <span className="text-foreground">{brand.name}</span></div>
            <div>Support phone: <span className="text-foreground">{brand.phone}</span></div>
            <div>Support email: <span className="text-foreground">{brand.email}</span></div>
            <div>Office hours: <span className="text-foreground">{brand.hours}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
