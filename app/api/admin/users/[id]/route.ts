import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      consultations: { orderBy: { createdAt: "desc" }, take: 5 },
      applications: { orderBy: { createdAt: "desc" }, take: 5 },
      appointments: { orderBy: { scheduledAt: "desc" }, take: 5 },
      documents: { orderBy: { uploadedAt: "desc" } },
    },
  });
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const updated = await prisma.client.update({
    where: { id },
    data: { name: body.name, phone: body.phone, country: body.country, notes: body.notes, isActive: body.isActive },
  });
  return NextResponse.json(updated);
}
