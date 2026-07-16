import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { requireAdmin } from "@/lib/api-auth";
import { ROLES } from "@/constants/roles";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin(["super_admin", "admin"]);
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  if (!(ROLES as readonly string[]).includes(body.role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await connectToDatabase();
  const user = await User.findByIdAndUpdate(id, { role: body.role }, { new: true }).lean();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin(["super_admin", "admin"]);
  if (response) return response;

  const { id } = await params;
  await connectToDatabase();
  await User.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
