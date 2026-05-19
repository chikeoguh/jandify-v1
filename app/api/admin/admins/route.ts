import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admins = await prisma.adminUser.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, isSuspended: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ admins });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session || session.role !== "SUPER_ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { name, email, password, role } = await req.json();
  const hashed = await bcrypt.hash(password, 12);
  const admin = await prisma.adminUser.create({
    data: { name, email: email.toLowerCase(), password: hashed, role },
  });
  return NextResponse.json({ id: admin.id, name: admin.name, email: admin.email, role: admin.role });
}
