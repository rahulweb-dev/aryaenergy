import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(5, "Message is too short").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
