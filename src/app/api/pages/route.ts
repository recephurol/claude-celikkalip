import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData } from "@/lib/json-store";

interface PageContent { id: number; slug: string; title: string; content: string; }

const FILE = "pages.json";

export async function GET() {
  const pages = await readData<PageContent>(FILE);
  return NextResponse.json(pages);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const pages = await readData<PageContent>(FILE);
  const idx = pages.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  pages[idx] = { ...pages[idx], title: body.title, content: body.content };
  await writeData(FILE, pages);
  return NextResponse.json(pages[idx]);
}
