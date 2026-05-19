import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const appointments = await prisma.appointment.findMany({
    orderBy: { scheduledAt: "asc" },
    include: { advisor: { select: { name: true } } },
  });
  return NextResponse.json({ appointments });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      status: body.status,
      advisorId: body.advisorId || null,
      meetLink: body.meetLink,
      adminNotes: body.adminNotes,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
    },
  });
  return NextResponse.json(updated);
}
