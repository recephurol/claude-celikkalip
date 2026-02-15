import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, nextId } from "@/lib/json-store";
import nodemailer from "nodemailer";

interface ContactMessage { id: number; name: string; phone: string; email: string; message: string; isRead: boolean; createdAt: string; }

const FILE = "messages.json";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur" }, { status: 400 });
    }

    const messages = await readData<ContactMessage>(FILE);
    const contact: ContactMessage = {
      id: nextId(messages),
      name,
      phone,
      email,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(contact);
    await writeData(FILE, messages);

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Çelik Kalıp Web" <${process.env.SMTP_USER}>`,
          to: "s.celik@celikkalipmakina.com",
          subject: `Yeni İletişim Formu: ${name}`,
          html: `
            <h2>Yeni İletişim Mesajı</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-posta</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mesaj</td><td style="padding:8px;border:1px solid #ddd;">${message}</td></tr>
            </table>
          `,
        });
      }
    } catch {
      // Email gönderilemese bile mesaj kaydedildi
    }

    return NextResponse.json({ success: true, id: contact.id });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

export async function GET() {
  const messages = await readData<ContactMessage>(FILE);
  return NextResponse.json(messages);
}

export async function PUT(req: NextRequest) {
  const { id, isRead } = await req.json();
  const messages = await readData<ContactMessage>(FILE);
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  messages[idx].isRead = isRead;
  await writeData(FILE, messages);
  return NextResponse.json(messages[idx]);
}

export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id"));
  const messages = await readData<ContactMessage>(FILE);
  const filtered = messages.filter((m) => m.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
