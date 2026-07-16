import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { requireAdmin } from "@/lib/api-auth";
import { parseListParams } from "@/lib/api-list";

export async function GET(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectToDatabase();
  const { search, page, limit } = parseListParams(req);

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { vehicleNumber: { $regex: search, $options: "i" } },
      { ownerName: { $regex: search, $options: "i" } },
      { ownerPhone: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    Vehicle.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Vehicle.countDocuments(query),
  ]);

  return NextResponse.json({
    rows: rows.map((v) => ({
      id: String(v._id),
      vehicleNumber: v.vehicleNumber,
      type: v.type,
      fuel: v.fuel,
      ownerName: v.ownerName,
      ownerPhone: v.ownerPhone,
      ownerEmail: v.ownerEmail ?? "",
    })),
    total,
    page,
    limit,
  });
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();
  const { vehicleNumber, type, fuel, ownerName, ownerPhone, ownerEmail, photoUrl } = body ?? {};

  if (![vehicleNumber, type, fuel, ownerName, ownerPhone].every((v) => typeof v === "string" && v.trim())) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectToDatabase();
  const vehicle = await Vehicle.create({ vehicleNumber, type, fuel, ownerName, ownerPhone, ownerEmail, photoUrl });

  return NextResponse.json({ ok: true, id: String(vehicle._id) });
}
