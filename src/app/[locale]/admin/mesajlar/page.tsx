"use client";

import { useEffect, useState, useCallback } from "react";

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    const res = await fetch("/api/contact");
    setMessages(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  async function toggleRead(msg: ContactMessage) {
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg.id, isRead: !msg.isRead }),
    });
    fetchMessages();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu mesaji silmek istediginize emin misiniz?")) return;
    await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    fetchMessages();
  }

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]" /></div>;

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">Mesajlar</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[var(--color-text-light)] mt-1">{unreadCount} okunmamis mesaj</p>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-[var(--color-border)] text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <p className="text-[var(--color-text-light)]">Henuz mesaj yok</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${msg.isRead ? "border-[var(--color-border)]" : "border-[var(--color-primary)] border-l-4"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">{msg.name}</h3>
                    {!msg.isRead && (
                      <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">Yeni</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-light)] mb-3">
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-[var(--color-primary)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      {msg.phone}
                    </a>
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-[var(--color-primary)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {msg.email}
                    </a>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {new Date(msg.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-[var(--color-text)] whitespace-pre-wrap">{msg.message}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toggleRead(msg)} className={`p-2 rounded-lg transition-colors ${msg.isRead ? "text-gray-400 hover:bg-gray-50" : "text-green-600 hover:bg-green-50"}`} title={msg.isRead ? "Okunmadi olarak isaretle" : "Okundu olarak isaretle"}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={msg.isRead ? "M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" : "M5 13l4 4L19 7"} /></svg>
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
