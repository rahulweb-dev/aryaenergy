import type { NextRequest } from "next/server";

export function parseListParams(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search")?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limit = Math.min(10000, Math.max(1, Number(searchParams.get("limit") ?? "10") || 10));
  return { search, page, limit, searchParams };
}
