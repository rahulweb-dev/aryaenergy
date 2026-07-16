import { NextResponse, type NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { requireAdmin } from "@/lib/api-auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await connectToDatabase();
  await Vehicle.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
