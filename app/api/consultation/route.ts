import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, degree, consultationType, message, budget } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Upsert client record
    let client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
      client = await prisma.client.create({
        data: { name, email, phone: phone || null, country: country || null },
      });
    }

    // Create consultation
    await prisma.consultation.create({
      data: {
        clientId: client.id,
        name,
        email,
        phone: phone || null,
        targetCountry: country || null,
        degreeLevel: degree || null,
        consultationType: consultationType || null,
        message: message || null,
        budget: budget || null,
        source: "website",
      },
    });

    return NextResponse.json({ success: true, message: "Consultation request received" });
  } catch (err) {
    console.error("Consultation save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
