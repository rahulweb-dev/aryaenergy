"use client";

import { Loader2 } from "lucide-react";

export function BusyOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-20 grid place-items-center rounded-3xl bg-background/70 backdrop-blur-sm"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
