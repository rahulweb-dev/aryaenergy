import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export async function getMonthlyReport() {
  await connectToDatabase();
  const rows = await Booking.aggregate([
    {
      $group: {
        _id: { $substrCP: ["$date", 0, 7] },
        total: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } },
        passed: { $sum: { $cond: [{ $eq: ["$result", "Passed"] }, 1, 0] } },
        failed: { $sum: { $cond: [{ $eq: ["$result", "Failed"] }, 1, 0] } },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 12 },
  ]);

  return (rows as { _id: string; total: number; completed: number; passed: number; failed: number }[]).map((r) => ({
    month: r._id,
    total: r.total,
    completed: r.completed,
    passed: r.passed,
    failed: r.failed,
  }));
}
