import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  // Clear existing images
  await prisma.productImage.deleteMany({});

  const imageData = [
    // Product 1: Celik Kaliplar
    { productId: products[0].id, urls: ["urun1.jpg", "urun2.jpg", "urun3.jpg"] },
    // Product 2: Kaucuk Urunler
    { productId: products[1].id, urls: ["urun4.jpg", "urun5.jpg", "urun6.jpg"] },
    // Product 3: Silikon Kaliplar
    { productId: products[2].id, urls: ["urun7.jpg", "urun8.jpg"] },
    // Product 4: Plastik Enjeksiyon
    { productId: products[3].id, urls: ["urun9.jpg", "urun10.jpg"] },
  ];

  for (const group of imageData) {
    for (let i = 0; i < group.urls.length; i++) {
      await prisma.productImage.create({
        data: {
          url: `/images/${group.urls[i]}`,
          alt: group.urls[i],
          order: i + 1,
          productId: group.productId,
        },
      });
    }
  }

  console.log("Images added!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
