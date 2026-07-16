import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { FadeIn } from "@/components/shared/motion";
import { faqs } from "@/constants/site-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Glossed } from "@/components/shared/Glossary";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about automated vehicle fitness testing.",
  openGraph: { title: "FAQ — ATS India", url: "/faq" },
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader eyebrow="FAQ" title="Answers, not runarounds." />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <FadeIn>
          <Accordion type="single" collapsible className="glass shadow-soft rounded-2xl px-6">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={i} value={`i${i}`} className="border-b last:border-0">
                <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground"><Glossed text={a} /></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </SiteLayout>
  );
}
