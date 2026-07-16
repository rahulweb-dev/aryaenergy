import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Mail, Phone, Clock, MessageCircle, type LucideIcon } from "lucide-react";
import { brand } from "@/constants/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ATS India via phone, email or WhatsApp.",
  openGraph: { title: "Contact — ATS India", url: "/contact" },
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Talk to a human." subtitle="Fleets, walk-ins, or press — we usually respond within one business hour." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:px-6">
        <FadeIn>
          <ContactForm />
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

function Info({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
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
