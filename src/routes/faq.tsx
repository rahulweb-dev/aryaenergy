import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { faqs } from "@/data/ats";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ATS India" },
      { name: "description", content: "Answers to the most common questions about automated vehicle fitness testing." },
      { property: "og:title", content: "FAQ — ATS India" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(([q, a]) => ({
          "@type": "Question", name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }),
    }],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="FAQ" title="Answers, not runarounds." />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <FadeIn>
          <Accordion type="single" collapsible className="glass shadow-soft rounded-2xl px-6">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={i} value={`i${i}`} className="border-b last:border-0">
                <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </SiteLayout>
  );
}
