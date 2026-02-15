import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData, nextId } from "@/lib/json-store";

interface Reference { id: number; name: string; logoUrl: string; website: string | null; order: number; isActive: boolean; }

const FILE = "references.json";

export async function GET() {
  const references = await readData<Reference>(FILE);
  const active = references.filter((r) => r.isActive).sort((a, b) => a.order - b.order);
  return NextResponse.json(active);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const references = await readData<Reference>(FILE);
  const reference: Reference = {
    id: nextId(references),
    name: body.name,
    logoUrl: body.logoUrl,
    website: body.website || null,
    order: body.order || 0,
    isActive: body.isActive ?? true,
  };
  references.push(reference);
  await writeData(FILE, references);
  return NextResponse.json(reference);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const references = await readData<Reference>(FILE);
  const idx = references.findIndex((r) => r.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  references[idx] = { ...references[idx], name: body.name, logoUrl: body.logoUrl, website: body.website, order: body.order, isActive: body.isActive };
  await writeData(FILE, references);
  return NextResponse.json(references[idx]);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const references = await readData<Reference>(FILE);
  const filtered = references.filter((r) => r.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
