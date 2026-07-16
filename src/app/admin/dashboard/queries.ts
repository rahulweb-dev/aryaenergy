import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { format } from "date-fns";

export async function getDashboardStats() {
  await connectToDatabase();

  const today = format(new Date(), "yyyy-MM-dd");

  const [todaysBookings, vehiclesTested, passed, failed, byCategory, trend, recent] = await Promise.all([
    Booking.countDocuments({ date: today }),
    Booking.countDocuments({ status: "Completed" }),
    Booking.countDocuments({ status: "Completed", result: "Passed" }),
    Booking.countDocuments({ status: "Completed", result: "Failed" }),
    Booking.aggregate([{ $group: { _id: "$vehicleType", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Booking.aggregate([
      { $group: { _id: { $substrCP: ["$date", 0, 7] }, bookings: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]),
    Booking.find().sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  const passRate = passed + failed > 0 ? Math.round((passed / (passed + failed)) * 100) : 0;

  return {
    todaysBookings,
    vehiclesTested,
    passed,
    failed,
    passRate,
    byCategory: (byCategory as { _id: string; count: number }[]).map((c) => ({ c: c._id ?? "Unknown", v: c.count })),
    trend: (trend as { _id: string; bookings: number }[]).map((t) => ({ m: t._id, bookings: t.bookings })),
    recent: recent.map((b) => ({
      id: String(b._id),
      reference: b.reference,
      ownerName: b.ownerName,
      vehicleNumber: b.vehicleNumber,
      date: b.date,
      status: b.status,
    })),
  };
}
