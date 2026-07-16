import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Search } from "lucide-react";
import { brand } from "@/data/ats";

export const Route = createFileRoute("/certificate")({
  head: () => ({
    meta: [
      { title: "Download Certificate — ATS India" },
      { name: "description", content: "Download your digital vehicle fitness certificate with QR verification." },
      { property: "og:title", content: "Certificate — ATS India" },
      { property: "og:url", content: "/certificate" },
    ],
    links: [{ rel: "canonical", href: "/certificate" }],
  }),
  component: Certificate,
});

function Certificate() {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Download certificate"
        title="Your fitness record, on demand."
        subtitle="Look up any past testing to download the PDF and share the QR-verifiable copy."
      />
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <form
          onSubmit={(e) => { e.preventDefault(); setShown(true); }}
          className="glass shadow-soft flex gap-2 rounded-2xl p-2"
        >
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Vehicle number or certificate ID" className="border-0 bg-transparent focus-visible:ring-0" />
          <Button type="submit" className="gradient-brand text-white"><Search className="mr-1 h-4 w-4" /> Search</Button>
        </form>

        {shown && (
          <FadeIn>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <div className="gradient-brand p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <div className="text-xs uppercase tracking-widest opacity-90">Fitness certificate</div>
                  </div>
                  <div className="text-xs opacity-90">CMVR Rule 175 · MoRTH</div>
                </div>
                <div className="mt-4 font-display text-2xl font-semibold">{brand.name}</div>
              </div>
              <div className="grid gap-8 p-6 md:grid-cols-[1fr_180px] md:p-10">
                <div className="grid gap-4 text-sm">
                  <Row k="Certificate No." v="ATS/2026/DL/000241" />
                  <Row k="Vehicle No." v={(q || "DL 3C AB 1234").toUpperCase()} />
                  <Row k="Owner" v="Rahul Mehta" />
                  <Row k="Category" v="LMV — Car" />
                  <Row k="Tested at" v="ATS India — Delhi NCR" />
                  <Row k="Issued on" v="15 Jul 2026" />
                  <Row k="Valid until" v="14 Jul 2027" />
                  <Row k="Result" v={<span className="font-semibold text-success">PASSED</span>} />
                </div>
                <div className="grid content-start justify-items-center gap-3">
                  {/* QR placeholder */}
                  <div className="grid h-40 w-40 grid-cols-8 grid-rows-8 gap-[2px] rounded-lg border border-border bg-white p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={((i * 37) % 5 < 2) ? "bg-secondary" : "bg-white"} />
                    ))}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Scan to verify</div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 border-t border-border p-4">
                <Button variant="outline">Share</Button>
                <Button className="gradient-brand text-white"><Download className="mr-1 h-4 w-4" /> Download PDF</Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-border py-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
