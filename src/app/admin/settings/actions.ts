"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

const schema = z.object({ name: z.string().trim().min(2, "Enter your name").max(80) });

export async function updateProfile(input: { name: string }) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, error: "Not signed in." };

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await connectToDatabase();
  await User.findByIdAndUpdate(session.user.id, { name: parsed.data.name });

  return { ok: true as const };
}
