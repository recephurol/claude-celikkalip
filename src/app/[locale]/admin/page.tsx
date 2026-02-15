"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, pages: 0, messages: 0, unread: 0, references: 0 });
  const t = useTranslations("admin");

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/pages").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
      fetch("/api/references").then((r) => r.json()),
    ]).then(([products, pages, messages, references]) => {
      setStats({
        products: products.length,
        pages: pages.length,
        messages: messages.length,
        unread: messages.filter((m: { isRead: boolean }) => !m.isRead).length,
        references: references.length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-8">{t("dashboard")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{stats.products}</p>
              <p className="text-sm text-[var(--color-text-light)]">{t("products")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-600 text-white flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{stats.pages}</p>
              <p className="text-sm text-[var(--color-text-light)]">{t("pages")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{stats.messages}</p>
              <p className="text-sm text-[var(--color-text-light)]">{t("messages")} {stats.unread > 0 && <span className="text-[var(--color-primary)] font-medium">({stats.unread} yeni)</span>}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{stats.references}</p>
              <p className="text-sm text-[var(--color-text-light)]">{t("references")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
