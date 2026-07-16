"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export async function lookupCertificate(query: string) {
  const q = query.trim();
  if (!q) return { ok: false as const, error: "Enter a vehicle number or booking reference." };

  await connectToDatabase();
  const booking = await Booking.findOne({
    $or: [{ vehicleNumber: q.toUpperCase() }, { reference: q.toUpperCase() }],
    status: "Completed",
  })
    .sort({ createdAt: -1 })
    .lean<{
      reference: string;
      vehicleNumber: string;
      ownerName: string;
      vehicleType: string;
      date: string;
      result: string;
    }>();

  if (!booking) {
    return { ok: false as const, error: "No completed test found for that vehicle number or reference." };
  }

  return {
    ok: true as const,
    certificate: {
      reference: booking.reference,
      vehicleNumber: booking.vehicleNumber,
      ownerName: booking.ownerName,
      vehicleType: booking.vehicleType,
      date: booking.date,
      result: booking.result,
    },
  };
}
