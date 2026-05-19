import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setAdminSession } from "@/lib/auth-admin";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });

    if (!admin || !admin.isActive || admin.isSuspended) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await setAdminSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: "LOGIN",
        resource: "AdminUser",
        resourceId: admin.id,
        ip: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({ success: true, role: admin.role });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
