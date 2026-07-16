import Link from "next/link";
import { SearchX, type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="glass shadow-soft mt-8 grid justify-items-center gap-3 rounded-3xl p-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" />
      </span>
      <div className="font-semibold">{title}</div>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="text-sm font-medium text-primary hover:underline">
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
