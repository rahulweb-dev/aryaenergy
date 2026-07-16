import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
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
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    Contact.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Contact.countDocuments(query),
  ]);

  return NextResponse.json({
    rows: rows.map((c) => ({
      id: String(c._id),
      name: c.name,
      phone: c.phone,
      email: c.email,
      message: c.message,
      status: c.status,
    })),
    total,
    page,
    limit,
  });
}
