export function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="glass sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
      <div>
        <div className="font-display text-lg font-semibold">{title}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    </header>
  );
}
