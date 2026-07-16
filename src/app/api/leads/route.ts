import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
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
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Lead.countDocuments(query),
  ]);

  return NextResponse.json({
    rows: rows.map((l) => ({
      id: String(l._id),
      name: l.name,
      phone: l.phone ?? "",
      email: l.email ?? "",
      source: l.source,
      message: l.message ?? "",
      status: l.status,
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
  const { name, phone, email, source, message } = body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  await connectToDatabase();
  const lead = await Lead.create({ name, phone, email, source: source || "Website", message });

  return NextResponse.json({ ok: true, id: String(lead._id) });
}
