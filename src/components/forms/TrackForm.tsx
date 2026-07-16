"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, Award, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { trackBooking } from "@/app/track/actions";
import { FadeIn } from "@/components/shared/motion";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { EmptyState } from "@/components/shared/EmptyState";

const STEP_LABELS = ["Check-in", "Document verification", "Automated testing", "Quality review", "Certificate generated"];

function stepsForStatus(status: string) {
  const doneCount =
    status === "Scheduled" ? 1 :
    status === "In Progress" ? 3 :
    status === "Completed" ? 5 :
    status === "Failed" ? 4 : 0;

  return STEP_LABELS.map((label, i) => ({
    label,
    done: i < doneCount,
    failed: status === "Failed" && i === doneCount - 1,
  }));
}

type Result = {
  reference: string;
  vehicleNumber: string;
  status: string;
  result: string;
};

export function TrackForm() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [notFound, setNotFound] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    const res = await trackBooking(q);
    setBusy(false);

    if (!res.ok) {
      toast.error(res.error);
      setResult(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setResult(res.booking);
  };

  const steps = result ? stepsForStatus(result.status) : [];
  const whatsappText = result
    ? encodeURIComponent(
        `ATS India vehicle status update:\nVehicle: ${result.vehicleNumber}\nStatus: ${result.status}\nReference: ${result.reference}`,
      )
    : "";

  return (
    <>
      <div className="relative">
        <BusyOverlay active={busy} />
        <form onSubmit={onSubmit} className="glass shadow-soft flex gap-2 rounded-2xl p-2">
          <fieldset disabled={busy} className="flex flex-1 gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Vehicle number (e.g. DL 3C AB 1234) or booking reference"
              className="border-0 bg-transparent focus-visible:ring-0"
            />
            <Button type="submit" disabled={busy} className="gradient-brand text-white">
              <Search className="mr-1 h-4 w-4" /> {busy ? "Tracking…" : "Track"}
            </Button>
          </fieldset>
        </form>
      </div>

      {notFound && (
        <EmptyState
          title="No booking found"
          description="Double-check the vehicle number or reference you used, or book a new test."
          actionHref="/book"
          actionLabel="Book a test"
        />
      )}

      {result && (
        <FadeIn>
          <div className="glass shadow-elevated mt-8 rounded-3xl p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Vehicle</div>
                <div className="mt-1 font-display text-2xl font-semibold">{result.vehicleNumber}</div>
                <div className="mt-1 text-xs text-muted-foreground">Ref · {result.reference}</div>
              </div>
              <StatusPill status={result.status} />
            </div>

            <ol className="mt-8 grid gap-4">
              {steps.map((s, i) => (
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
              {result.status === "Completed" && (
                <Button asChild className="gradient-brand text-white">
                  <a href="/certificate"><Award className="mr-1 h-4 w-4" /> Download certificate</a>
                </Button>
              )}
              <a
                href={`https://wa.me/?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" /> Share on WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      )}
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Scheduled: "bg-primary/10 text-primary",
    "In Progress": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    Completed: "bg-success/15 text-success",
    Failed: "bg-destructive/15 text-destructive",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status] ?? ""}`}>{status}</span>;
}
