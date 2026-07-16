import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(160),
  vehicleNumber: z.string().trim().min(4, "Enter vehicle number").max(15),
  vehicleType: z.string().min(1, "Choose a type"),
  fuel: z.string().min(1, "Choose a fuel type"),
  date: z.string().min(1, "Pick a date"),
  slot: z.string().min(1, "Pick a slot"),
  remarks: z.string().max(400).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
