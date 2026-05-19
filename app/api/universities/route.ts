import { NextRequest, NextResponse } from "next/server";
import { searchUniversities } from "@/lib/hipolabs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || searchParams.get("q") || undefined;
  const country = searchParams.get("country") || undefined;
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const results = await searchUniversities({ name, country, limit, offset });
  return NextResponse.json({ results, count: results.length });
}
