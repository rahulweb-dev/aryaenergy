import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Vehicle Status — ATS India" },
      { name: "description", content: "Track your vehicle's automated fitness testing status in real time." },
      { property: "og:title", content: "Track — ATS India" },
      { property: "og:url", content: "/track" },
    ],
    links: [{ rel: "canonical", href: "/track" }],
  }),
  component: Track,
});

type Result = { vehicle: string; status: "Testing Completed" | "In Progress" | "Passed" | "Failed"; steps: { label: string; done: boolean; failed?: boolean }[]; ref: string };

function Track() {
  const [result, setResult] = useState<Result | null>(null);
  const [q, setQ] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setResult({
      vehicle: q.toUpperCase(),
      status: "Passed",
      ref: "ATS-" + (100000 + (q.length * 13)),
      steps: [
        { label: "Check-in", done: true },
        { label: "Document verification", done: true },
        { label: "Automated testing", done: true },
        { label: "Quality review", done: true },
        { label: "Certificate generated", done: true },
      ],
    });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Track vehicle"
        title="Live status. Zero calls."
        subtitle="Enter your vehicle or application number to see exactly where you are in the pipeline."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <form onSubmit={onSubmit} className="glass shadow-soft flex gap-2 rounded-2xl p-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Vehicle number (e.g. DL 3C AB 1234) or Application ID"
            className="border-0 bg-transparent focus-visible:ring-0"
          />
          <Button type="submit" className="gradient-brand text-white">
            <Search className="mr-1 h-4 w-4" /> Track
          </Button>
        </form>

        {result && (
          <FadeIn>
            <div className="glass shadow-elevated mt-8 rounded-3xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Vehicle</div>
                  <div className="mt-1 font-display text-2xl font-semibold">{result.vehicle}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Ref · {result.ref}</div>
                </div>
                <StatusPill status={result.status} />
              </div>

              <ol className="mt-8 grid gap-4">
                {result.steps.map((s, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`grid h-8 w-8 place-items-center rounded-full ${
                      s.failed ? "bg-destructive/15 text-destructive" : s.done ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {s.failed ? <XCircle className="h-4 w-4" /> : s.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </span>
                    <span className={`text-sm ${s.done ? "font-medium" : "text-muted-foreground"}`}>{s.label}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="gradient-brand text-white">
                  <a href="/certificate"><Award className="mr-1 h-4 w-4" /> Download certificate</a>
                </Button>
                <Button variant="outline">Share on WhatsApp</Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </SiteLayout>
  );
}

function StatusPill({ status }: { status: Result["status"] }) {
  const map = {
    "Testing Completed": "bg-primary/10 text-primary",
    "In Progress": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    "Passed": "bg-success/15 text-success",
    "Failed": "bg-destructive/15 text-destructive",
  } as const;
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status]}`}>{status}</span>;
}
