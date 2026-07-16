"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export async function trackBooking(query: string) {
  const q = query.trim();
  if (!q) return { ok: false as const, error: "Enter a vehicle number or booking reference." };

  await connectToDatabase();
  const booking = await Booking.findOne({
    $or: [{ vehicleNumber: q.toUpperCase() }, { reference: q.toUpperCase() }],
  })
    .sort({ createdAt: -1 })
    .lean<{ reference: string; vehicleNumber: string; status: string; result: string }>();

  if (!booking) {
    return { ok: false as const, error: "No booking found for that vehicle number or reference." };
  }

  return {
    ok: true as const,
    booking: {
      reference: booking.reference,
      vehicleNumber: booking.vehicleNumber,
      status: booking.status,
      result: booking.result,
    },
  };
}
