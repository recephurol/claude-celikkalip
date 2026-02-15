"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function IletisimPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSending(false);
  }

  return (
    <>
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-red-100 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">{t("reach_us")}</h2>
                <p className="text-[var(--color-text-light)] mb-8">{t("reach_desc")}</p>
              </div>

              <a href="tel:+905550660277" className="flex items-start gap-5 p-6 bg-[var(--color-bg-alt)] rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-primary)] mb-1">{t("phone")}</h3>
                  <span className="text-lg text-[var(--color-text)]">0555 066 02 77</span>
                </div>
              </a>

              <a href="mailto:s.celik@celikkalipmakina.com" className="flex items-start gap-5 p-6 bg-[var(--color-bg-alt)] rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-primary)] mb-1">{t("email")}</h3>
                  <span className="text-lg text-[var(--color-text)]">s.celik@celikkalipmakina.com</span>
                </div>
              </a>

              <div className="flex items-start gap-5 p-6 bg-[var(--color-bg-alt)] rounded-xl">
                <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-primary)] mb-1">{t("location")}</h3>
                  <p className="text-[var(--color-text-light)]">{t("location_value")}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-border)]">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2">{t("form_title")}</h2>
                <p className="text-[var(--color-text-light)] mb-6">{t("form_desc")}</p>

                {status === "success" && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 text-sm font-medium">
                    {t("success")}
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">
                    {t("error")}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("name")}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder={t("name_placeholder")}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("phone_number")}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder={t("phone_placeholder")}
                        className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("email_address")}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder={t("email_placeholder")}
                        className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("message")}</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      placeholder={t("message_placeholder")}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        {t("send")}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.5!2d29.07069!3d40.220970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEzJzE1LjUiTiAyOcKwMDQnMTQuNSJF!5e0!3m2!1str!2str!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Celik Kalip Makina Konum - Bursa"
            />
          </div>
        </div>
      </section>
    </>
  );
}
