import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const c = await prisma.consultation.findUnique({
    where: { id },
    include: { advisor: { select: { id: true, name: true, email: true } } },
  });
  if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(c);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { name, email, phone, targetCountry, degreeLevel, budget, status, priority, advisorId, adminNotes, scheduledAt, followUpAt, meetLink } = body;

  const updated = await prisma.consultation.update({
    where: { id },
    data: {
      name, email, phone, targetCountry, degreeLevel, budget,
      status, priority, advisorId: advisorId || null,
      adminNotes, meetLink,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      followUpAt: followUpAt ? new Date(followUpAt) : null,
    },
  });

  await prisma.auditLog.create({
    data: { adminId: session.id, action: "UPDATE", resource: "Consultation", resourceId: id },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role === "ADVISOR") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await prisma.consultation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
