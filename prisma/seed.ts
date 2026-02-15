import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@celikkalipmakina.com" },
    update: {},
    create: {
      email: "admin@celikkalipmakina.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "hakkimizda" },
    update: {},
    create: {
      slug: "hakkimizda",
      title: "Hakkimizda",
      content: `Celik Kalip Makina, kalip imalati ve kaucuk uretimi alaninda yillardir sektorun onde gelen firmalari arasinda yer almaktadir. Modern uretim tesislerimizde, en son teknoloji CNC tezgahlari ve hassas isleme merkezleri ile musteri ihtiyaclarina yonelik ozel cozumler uretiyoruz.

Firmamiz, otomotiv, savunma sanayi, insaat ve endustriyel uretim sektorlerine yonelik celik kalip, kaucuk kalip, silikon kalip ve plastik enjeksiyon kaliplari tasarlayip uretmektedir. Her projeye muhendislik bakis acisiyla yaklasarak, dayanikli, hassas ve uzun omurlu kaliplar ortaya koyuyoruz.

Kaucuk uretim hattimizda ise; teknik kaucuk parcalar, contalar, burcullar, tamponlar ve ozel profil urunleri olmak uzere genis bir urun yelpazesi sunuyoruz. NBR, EPDM, silikon ve viton gibi farkli kaucuk turleri ile calisarak her turlu endustriyel ihtiyaca cevap veriyoruz.

Kalite kontrol sureclerimiz, hammadde girisinden nihai urune kadar her asamada titizlikle uygulanmaktadir. ISO standartlarina uygun uretim anlayisimiz ve deneyimli kadromuz ile musterilerimize guvenilir ve surdurulebilir cozumler sunmaktayiz.`,
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "anasayfa-hero" },
    update: {},
    create: {
      slug: "anasayfa-hero",
      title: "Celik Kalip Makina",
      content:
        "Kalip imalati ve kaucuk uretiminde uzman cozum ortaginiz. Yillardir sektore guven ve kalite ile hizmet veriyoruz.",
    },
  });

  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Celik Kaliplar",
      description:
        "CNC isleme merkezlerinde uretilen yuksek hassasiyetli celik kaliplar. Otomotiv, savunma ve endustriyel uygulamalar icin idealdir.",
      category: "kalip",
      order: 1,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Kaucuk Urunler",
      description:
        "NBR, EPDM, silikon ve viton malzemelerden uretilen teknik kaucuk parcalar, contalar ve ozel profiller.",
      category: "kaucuk",
      order: 2,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Silikon Kaliplar",
      description:
        "Yuksek sicaklik dayanimi gerektiren uygulamalar icin ozel tasarim silikon kaliplar ve urunler.",
      category: "kalip",
      order: 3,
    },
  });

  const product4 = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Plastik Enjeksiyon Kaliplari",
      description:
        "Seri uretim icin optimize edilmis, uzun omurlu plastik enjeksiyon kaliplari.",
      category: "kalip",
      order: 4,
    },
  });

  console.log("Seed data olusturuldu!");
  console.log("Admin: admin@celikkalipmakina.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
