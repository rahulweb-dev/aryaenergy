import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { AdminSidebarNav } from "@/components/shared/AdminSidebar";
import { SignOutButton } from "@/components/shared/SignOutButton";
import { ROLE_LABELS, type Role } from "@/constants/roles";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="grid min-h-screen grid-cols-1 bg-muted md:grid-cols-[260px_1fr]">
      <aside className="hidden gradient-dark p-5 text-white md:block">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">ATS India</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Admin</div>
          </div>
        </Link>

        <AdminSidebarNav />

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Signed in as <span className="font-medium text-white">{session?.user?.email}</span>
          <div className="mt-1 text-[11px] text-white/50">
            {session?.user?.role ? ROLE_LABELS[session.user.role as Role] : ""}
          </div>
          <div className="mt-3">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="grid grid-rows-[auto_1fr]">{children}</div>
    </div>
  );
}
