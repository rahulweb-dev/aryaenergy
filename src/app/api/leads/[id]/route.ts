import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { requireAdmin } from "@/lib/api-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  if (typeof body.status !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await connectToDatabase();
  const lead = await Lead.findByIdAndUpdate(id, { status: body.status }, { new: true }).lean();
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await connectToDatabase();
  await Lead.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
