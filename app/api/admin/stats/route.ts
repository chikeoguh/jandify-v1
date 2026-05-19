import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [consultations, applications, clients, appointments] = await Promise.all([
    prisma.consultation.count(),
    prisma.application.count(),
    prisma.client.count(),
    prisma.appointment.count({ where: { status: "CONFIRMED" } }),
  ]);

  return NextResponse.json({ consultations, applications, clients, appointments });
}
