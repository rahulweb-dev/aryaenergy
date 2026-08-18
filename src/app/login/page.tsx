import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";
import { brand } from "@/constants/site-content";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const highlights = [
  "VAHAN-integrated digital certificates",
  "10-minute automated fitness testing",
  "Real-time fleet & booking oversight",
];

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between gradient-brand p-10 text-brand-foreground lg:flex">
        <Link href="/" className="flex items-center gap-2 font-display">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight">{brand.short}</span>
        </Link>

        <div className="max-w-sm">
          <h1 className="font-display text-3xl font-semibold leading-tight">{brand.tagline}</h1>
          <ul className="mt-8 grid gap-3 text-sm text-brand-foreground/90">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-brand-foreground/70">
          © {new Date().getFullYear()} {brand.name}. Admin access only.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center bg-muted/40 px-4 py-12 md:px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2 font-display lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-brand-foreground shadow-elevated">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{brand.short}</span>
          </Link>

          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Admin</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Sign in to your dashboard</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Enter your credentials to access the admin panel.</p>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <Link href="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-foreground">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
