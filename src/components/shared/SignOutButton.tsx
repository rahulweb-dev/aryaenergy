"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className="flex items-center gap-2 text-xs text-white/60 hover:text-white"
    >
      <LogOut className="h-3.5 w-3.5" /> Sign out
    </button>
  );
}
