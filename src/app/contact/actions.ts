"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { Lead } from "@/models/Lead";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import { sendEmail } from "@/lib/resend";
import { brand } from "@/constants/site-content";

export async function submitContact(input: ContactInput) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  await connectToDatabase();
  await Contact.create(parsed.data);
  await Lead.create({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    source: "Contact Form",
    message: parsed.data.message,
  });

  void sendEmail({
    to: brand.email,
    subject: `New contact form message from ${parsed.data.name}`,
    html: `<p><strong>${parsed.data.name}</strong> (${parsed.data.phone}, ${parsed.data.email}) wrote:</p><p>${parsed.data.message}</p>`,
  });

  return { ok: true as const };
}
