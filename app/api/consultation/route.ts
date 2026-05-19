import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, degree, consultationType, message, budget } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // In production: save to DB and send email notification
    // For now, log and return success
    console.log("New consultation request:", { name, email, phone, country, degree, consultationType, message, budget });

    // TODO: integrate with Resend/email + Prisma when DB is configured
    return NextResponse.json({ success: true, message: "Consultation request received" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
