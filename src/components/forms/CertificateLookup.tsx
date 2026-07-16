"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Search } from "lucide-react";
import { toast } from "sonner";
import { lookupCertificate } from "@/app/certificate/actions";
import { brand } from "@/constants/site-content";
import { FadeIn } from "@/components/shared/motion";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { EmptyState } from "@/components/shared/EmptyState";
import { Glossed } from "@/components/shared/Glossary";

type Certificate = {
  reference: string;
  vehicleNumber: string;
  ownerName: string;
  vehicleType: string;
  date: string;
  result: string;
};

export function CertificateLookup() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [cert, setCert] = useState<Certificate | null>(null);
  const [notFound, setNotFound] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    const res = await lookupCertificate(q);
    setBusy(false);

    if (!res.ok) {
      toast.error(res.error);
      setCert(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setCert(res.certificate);
  };

  return (
    <>
      <div className="relative">
        <BusyOverlay active={busy} />
        <form onSubmit={onSubmit} className="glass shadow-soft flex gap-2 rounded-2xl p-2">
          <fieldset disabled={busy} className="flex flex-1 gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Vehicle number or booking reference"
              className="border-0 bg-transparent focus-visible:ring-0"
            />
            <Button type="submit" disabled={busy} className="gradient-brand text-white">
              <Search className="mr-1 h-4 w-4" /> {busy ? "Searching…" : "Search"}
            </Button>
          </fieldset>
        </form>
      </div>

      {notFound && (
        <EmptyState
          title="No completed test found"
          description="Certificates only appear once testing is complete. Double-check the vehicle number or reference, or track your vehicle's status."
          actionHref="/track"
          actionLabel="Track vehicle status"
        />
      )}

      {cert && (
        <FadeIn>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
            <div className="gradient-brand p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  <div className="text-xs uppercase tracking-widest opacity-90">Fitness certificate</div>
                </div>
                <div className="text-xs opacity-90"><Glossed text="CMVR Rule 175 · MoRTH" /></div>
              </div>
              <div className="mt-4 font-display text-2xl font-semibold">{brand.name}</div>
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-[1fr_180px] md:p-10">
              <div className="grid gap-4 text-sm">
                <Row k="Certificate No." v={cert.reference} />
                <Row k="Vehicle No." v={cert.vehicleNumber} />
                <Row k="Owner" v={cert.ownerName} />
                <Row k="Category" v={cert.vehicleType} />
                <Row k="Tested at" v={`${brand.short} — Delhi NCR`} />
                <Row k="Issued on" v={cert.date} />
                <Row
                  k="Result"
                  v={
                    <span className={`font-semibold ${cert.result === "Passed" ? "text-success" : "text-destructive"}`}>
                      {cert.result.toUpperCase()}
                    </span>
                  }
                />
              </div>
              <div className="grid content-start justify-items-center gap-3">
                <div className="grid h-40 w-40 grid-cols-8 grid-rows-8 gap-[2px] rounded-lg border border-border bg-white p-2">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={i * 37 % 5 < 2 ? "bg-secondary" : "bg-white"} />
                  ))}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Scan to verify</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-border p-4">
              <Button variant="outline" onClick={() => window.print()}>Share</Button>
              <Button className="gradient-brand text-white" onClick={() => window.print()}>
                <Download className="mr-1 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
        </FadeIn>
      )}
    </>
  );
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-border py-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
