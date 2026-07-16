import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { requireAdmin } from "@/lib/api-auth";
import { parseListParams } from "@/lib/api-list";
import { ROLES } from "@/constants/roles";

export async function GET(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  await connectToDatabase();
  const { search, page, limit } = parseListParams(req);
  const role = req.nextUrl.searchParams.get("role");

  const query: Record<string, unknown> = {};
  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [rows, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    User.countDocuments(query),
  ]);

  return NextResponse.json({
    rows: rows.map((u) => ({
      id: String(u._id),
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone ?? "",
    })),
    total,
    page,
    limit,
  });
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdmin(["super_admin", "admin"]);
  if (response) return response;

  const body = await req.json();
  const { name, email, password, role } = body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !(ROLES as readonly string[]).includes(role)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "A user with that email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email: email.toLowerCase(), passwordHash, role });

  return NextResponse.json({ ok: true, id: String(user._id) });
}
