import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { brand } from "@/data/ats";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ATS India" },
      { name: "description", content: "Get in touch with ATS India via phone, email or WhatsApp." },
      { property: "og:title", content: "Contact — ATS India" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Talk to a human." subtitle="Fleets, walk-ins, or press — we usually respond within one business hour." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:px-6">
        <FadeIn>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Message received — we'll be in touch shortly."); (e.target as HTMLFormElement).reset(); }}
            className="glass shadow-soft grid gap-5 rounded-3xl p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label htmlFor="cname">Name</Label><Input id="cname" required className="mt-1.5" /></div>
              <div><Label htmlFor="cphone">Phone</Label><Input id="cphone" required className="mt-1.5" /></div>
            </div>
            <div><Label htmlFor="cemail">Email</Label><Input id="cemail" type="email" required className="mt-1.5" /></div>
            <div><Label htmlFor="cmsg">Message</Label><Textarea id="cmsg" rows={5} required className="mt-1.5" /></div>
            <Button type="submit" size="lg" className="gradient-brand text-white shadow-elevated">Send message</Button>
          </form>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-4">
            <Info icon={Phone}    title="Phone"   body={brand.phone} />
            <Info icon={Mail}     title="Email"   body={brand.email} />
            <Info icon={MapPin}   title="Head office" body={brand.address} />
            <Info icon={Clock}    title="Office hours" body={brand.hours} />
            <a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
               className="glass shadow-soft flex items-center justify-between rounded-2xl p-5 transition-transform hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">WhatsApp us</div>
                  <div className="text-xs text-muted-foreground">Instant replies · {brand.whatsapp}</div>
                </div>
              </div>
              <span className="text-xs font-medium text-success">24×7</span>
            </a>
            <div className="glass shadow-soft grid h-56 place-items-center rounded-2xl text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-8 w-8 text-primary" />
                <div className="text-xs uppercase tracking-widest">Map placeholder</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SiteLayout>
  );
}

function Info({ icon: Icon, title, body }: { icon: typeof Phone; title: string; body: string }) {
  return (
    <div className="glass shadow-soft flex items-center gap-3 rounded-2xl p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="font-medium">{body}</div>
      </div>
    </div>
  );
}
