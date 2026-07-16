"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/app/admin/settings/actions";

const schema = z.object({ name: z.string().trim().min(2, "Enter your name").max(80) });
type ProfileInput = z.infer<typeof schema>;

export function ProfileSettingsForm({ defaultName }: { defaultName: string }) {
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({ resolver: zodResolver(schema), defaultValues: { name: defaultName } });

  const onSubmit = async (data: ProfileInput) => {
    setBusy(true);
    const res = await updateProfile(data);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Profile updated.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-sm gap-4">
      <div>
        <Label>Display name</Label>
        <Input className="mt-1.5" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <Button type="submit" disabled={busy} className="w-fit gradient-brand text-white">
        {busy ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
