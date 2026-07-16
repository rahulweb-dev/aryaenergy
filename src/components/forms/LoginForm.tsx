"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { loginSchema, type LoginInput } from "@/lib/validation/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setBusy(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setBusy(false);

    if (!result || result.error) {
      toast.error("Invalid email or password.");
      return;
    }

    toast.success("Signed in.");
    router.push(searchParams.get("callbackUrl") ?? "/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="relative">
      <BusyOverlay active={busy} />
      <form onSubmit={handleSubmit(onSubmit)} className="glass shadow-soft rounded-3xl p-6 md:p-8">
        <fieldset disabled={busy} className="grid gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="mt-1.5" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" size="lg" disabled={busy} className="gradient-brand text-white shadow-elevated">
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
