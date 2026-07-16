import { format } from "date-fns";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { ALL_SLOTS } from "@/constants/slots";

export { ALL_SLOTS };

export function fmtDate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function addDays(n: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

export async function getBookedSlots(date: string, excludeBookingId?: string): Promise<string[]> {
  await connectToDatabase();
  const query: Record<string, unknown> = { date };
  if (excludeBookingId) query._id = { $ne: excludeBookingId };
  const rows = await Booking.find(query).select("slot").lean<{ slot: string }[]>();
  return rows.map((r) => r.slot);
}

export async function isDayFull(date: string): Promise<boolean> {
  const booked = await getBookedSlots(date);
  return booked.length >= ALL_SLOTS.length;
}
