"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { Vehicle } from "@/models/Vehicle";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { getBookedSlots } from "@/lib/availability";
import { sendEmail } from "@/lib/resend";
import { brand } from "@/constants/site-content";

function generateReference() {
  return "ATS-" + Math.floor(100000 + Math.random() * 900000);
}

export async function getAvailableSlots(date: string) {
  return getBookedSlots(date);
}

export async function createBooking(input: BookingInput) {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const data = parsed.data;

  await connectToDatabase();

  const taken = await getBookedSlots(data.date);
  if (taken.includes(data.slot)) {
    return { ok: false as const, error: "That slot was just booked. Please pick another." };
  }

  const reference = generateReference();

  await Booking.create({
    reference,
    ownerName: data.name,
    phone: data.phone,
    email: data.email,
    vehicleNumber: data.vehicleNumber,
    vehicleType: data.vehicleType,
    fuel: data.fuel,
    date: data.date,
    slot: data.slot,
    remarks: data.remarks,
  });

  await Vehicle.findOneAndUpdate(
    { vehicleNumber: data.vehicleNumber.toUpperCase() },
    {
      vehicleNumber: data.vehicleNumber,
      type: data.vehicleType,
      fuel: data.fuel,
      ownerName: data.name,
      ownerPhone: data.phone,
      ownerEmail: data.email,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  void sendEmail({
    to: data.email,
    subject: `Booking confirmed — ${reference}`,
    html: `<p>Hi ${data.name},</p><p>Your ${brand.short} appointment for <strong>${data.vehicleNumber}</strong> is confirmed for ${data.date}, ${data.slot}.</p><p>Reference: <strong>${reference}</strong></p>`,
  });

  return { ok: true as const, reference };
}
