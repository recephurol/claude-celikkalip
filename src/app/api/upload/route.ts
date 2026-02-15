import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData, nextId } from "@/lib/json-store";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

interface ProductImage { id: number; url: string; alt: string | null; order: number; }
interface Product { id: number; title: string; description: string | null; category: string | null; isActive: boolean; order: number; images: ProductImage[]; }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const productId = formData.get("productId") as string;
  const alt = (formData.get("alt") as string) || "";

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "images");
  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  const url = `/images/${filename}`;

  if (productId) {
    const products = await readData<Product>("products.json");
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      const allImages = products.flatMap((p) => p.images);
      const newImage: ProductImage = { id: nextId(allImages), url, alt, order: product.images.length };
      product.images.push(newImage);
      await writeData("products.json", products);
      return NextResponse.json(newImage);
    }
  }

  return NextResponse.json({ url, filename });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const products = await readData<Product>("products.json");
  for (const product of products) {
    const idx = product.images.findIndex((img) => img.id === id);
    if (idx !== -1) {
      product.images.splice(idx, 1);
      break;
    }
  }
  await writeData("products.json", products);
  return NextResponse.json({ success: true });
}
