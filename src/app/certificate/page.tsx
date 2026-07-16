import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { CertificateLookup } from "@/components/forms/CertificateLookup";

export const metadata: Metadata = {
  title: "Download Certificate",
  description: "Download your digital vehicle fitness certificate with QR verification.",
  openGraph: { title: "Certificate — ATS India", url: "/certificate" },
  alternates: { canonical: "/certificate" },
};

export default function Certificate() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Download certificate"
        title="Your fitness record, on demand."
        subtitle="Look up any completed test to view the certificate and share the QR-verifiable copy."
      />
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <CertificateLookup />
      </div>
    </SiteLayout>
  );
}
