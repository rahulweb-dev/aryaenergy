import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { requireAdmin } from "@/lib/api-auth";
import { parseListParams } from "@/lib/api-list";

export async function GET(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectToDatabase();
  const { search, page, limit } = parseListParams(req);
  const status = req.nextUrl.searchParams.get("status");

  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { reference: { $regex: search, $options: "i" } },
      { ownerName: { $regex: search, $options: "i" } },
      { vehicleNumber: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    Booking.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Booking.countDocuments(query),
  ]);

  return NextResponse.json({
    rows: rows.map((b) => ({
      id: String(b._id),
      reference: b.reference,
      ownerName: b.ownerName,
      phone: b.phone,
      email: b.email,
      vehicleNumber: b.vehicleNumber,
      vehicleType: b.vehicleType,
      fuel: b.fuel,
      date: b.date,
      slot: b.slot,
      status: b.status,
      result: b.result,
    })),
    total,
    page,
    limit,
  });
}
