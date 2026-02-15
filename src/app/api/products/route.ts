import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData, nextId } from "@/lib/json-store";

interface ProductImage { id: number; url: string; alt: string | null; order: number; }
interface Product { id: number; title: string; description: string | null; category: string | null; isActive: boolean; order: number; images: ProductImage[]; }

const FILE = "products.json";

export async function GET() {
  const products = await readData<Product>(FILE);
  const sorted = products.sort((a, b) => a.order - b.order);
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const products = await readData<Product>(FILE);
  const product: Product = {
    id: nextId(products),
    title: body.title,
    description: body.description || null,
    category: body.category || null,
    order: body.order || 0,
    isActive: body.isActive ?? true,
    images: [],
  };
  products.push(product);
  await writeData(FILE, products);
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const products = await readData<Product>(FILE);
  const idx = products.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  products[idx] = { ...products[idx], title: body.title, description: body.description, category: body.category, order: body.order, isActive: body.isActive };
  await writeData(FILE, products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const products = await readData<Product>(FILE);
  const filtered = products.filter((p) => p.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
