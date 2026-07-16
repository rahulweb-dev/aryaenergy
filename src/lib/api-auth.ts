import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminRole, type Role } from "@/constants/roles";

export async function requireAdmin(allowedRoles?: Role[]) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user || !isAdminRole(role)) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return { session: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { session, response: null };
}
