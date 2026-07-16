import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export async function getAnalytics() {
  await connectToDatabase();

  const [byFuel, byStatus] = await Promise.all([
    Booking.aggregate([{ $group: { _id: "$fuel", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
  ]);

  return {
    byFuel: (byFuel as { _id: string; count: number }[]).map((f) => ({ c: f._id ?? "Unknown", v: f.count })),
    byStatus: (byStatus as { _id: string; count: number }[]).map((s) => ({ n: s._id ?? "Unknown", v: s.count })),
  };
}
