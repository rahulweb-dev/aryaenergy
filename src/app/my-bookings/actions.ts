"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { getBookedSlots } from "@/lib/availability";

export async function findMyBookings(phone: string) {
  const p = phone.trim();
  if (!/^[6-9]\d{9}$/.test(p)) {
    return { ok: false as const, error: "Enter a valid 10-digit mobile number." };
  }

  await connectToDatabase();
  const rows = await Booking.find({ phone: p })
    .sort({ date: 1, slot: 1 })
    .lean<
      {
        _id: unknown;
        reference: string;
        ownerName: string;
        vehicleNumber: string;
        vehicleType: string;
        fuel: string;
        date: string;
        slot: string;
        status: string;
      }[]
    >();

  return {
    ok: true as const,
    bookings: rows.map((b) => ({
      id: String(b._id),
      reference: b.reference,
      ownerName: b.ownerName,
      vehicleNumber: b.vehicleNumber,
      vehicleType: b.vehicleType,
      fuel: b.fuel,
      date: b.date,
      slot: b.slot,
      status: b.status,
    })),
  };
}

export async function rescheduleBooking(input: { id: string; date: string; slot: string }) {
  await connectToDatabase();

  const booking = await Booking.findById(input.id);
  if (!booking) return { ok: false as const, error: "Booking not found." };

  if (booking.status === "Completed" || booking.status === "In Progress") {
    return { ok: false as const, error: "This booking can no longer be rescheduled." };
  }

  const isOwnSlot = booking.date === input.date && booking.slot === input.slot;
  if (!isOwnSlot) {
    const taken = await getBookedSlots(input.date, input.id);
    if (taken.includes(input.slot)) {
      return { ok: false as const, error: "That slot is no longer available." };
    }
  }

  booking.date = input.date;
  booking.slot = input.slot;
  booking.status = "Scheduled";
  await booking.save();

  revalidatePath("/my-bookings");

  return { ok: true as const };
}
