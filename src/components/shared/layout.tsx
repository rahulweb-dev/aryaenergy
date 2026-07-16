import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border gradient-hero">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
