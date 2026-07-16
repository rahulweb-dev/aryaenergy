import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteLayout, PageHeader } from "@/components/shared/layout";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Admin" title="Sign in to the admin dashboard." />
      <div className="mx-auto max-w-md px-4 py-16 md:px-6">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </SiteLayout>
  );
}
