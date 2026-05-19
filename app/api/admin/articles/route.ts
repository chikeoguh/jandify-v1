import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth-admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt || "",
      content: body.content || "",
      category: body.category || "General",
      tags: body.tags || [],
      published: body.published || false,
      featured: body.featured || false,
      authorId: session.id,
      authorName: session.name || session.email,
      publishedAt: body.published ? new Date() : null,
    },
  });
  return NextResponse.json(article);
}
