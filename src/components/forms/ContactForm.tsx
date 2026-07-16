"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import { submitContact } from "@/app/contact/actions";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setBusy(true);
    const result = await submitContact(data);
    setBusy(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Message received — we'll be in touch shortly.");
    reset();
  };

  return (
    <div className="relative">
      <BusyOverlay active={busy} />
      <form onSubmit={handleSubmit(onSubmit)} className="glass shadow-soft rounded-3xl p-6 md:p-8">
        <fieldset disabled={busy} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" className="mt-1.5" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="cphone">Phone</Label>
              <Input id="cphone" className="mt-1.5" {...register("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="cemail">Email</Label>
            <Input id="cemail" type="email" className="mt-1.5" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="cmsg">Message</Label>
            <Textarea id="cmsg" rows={5} className="mt-1.5" {...register("message")} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
          </div>
          <Button type="submit" size="lg" disabled={busy} className="gradient-brand text-white shadow-elevated">
            {busy ? "Sending…" : "Send message"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
