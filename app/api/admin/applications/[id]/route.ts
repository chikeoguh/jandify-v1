import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const app = await prisma.application.findUnique({
    where: { id },
    include: {
      client: true,
      documents: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(app);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();

  const current = await prisma.application.findUnique({ where: { id }, select: { status: true } });
  const statusChanged = current && body.status && current.status !== body.status;

  const updated = await prisma.application.update({
    where: { id },
    data: {
      status: body.status,
      priority: body.priority,
      adminNotes: body.adminNotes,
      offerDeadline: body.offerDeadline ? new Date(body.offerDeadline) : undefined,
      visaDeadline: body.visaDeadline ? new Date(body.visaDeadline) : undefined,
      tuitionFee: body.tuitionFee ? parseFloat(body.tuitionFee) : undefined,
      scholarshipAmount: body.scholarshipAmount ? parseFloat(body.scholarshipAmount) : undefined,
    },
    include: { client: true, documents: true, statusHistory: { orderBy: { createdAt: "desc" } } },
  });

  if (statusChanged) {
    await prisma.applicationStatusHistory.create({
      data: { applicationId: id, status: body.status, note: body.statusNote, changedBy: session.name || session.email },
    });
  }

  return NextResponse.json(updated);
}
