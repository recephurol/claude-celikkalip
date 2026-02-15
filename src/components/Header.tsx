"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/hakkimizda" as const, label: t("about") },
    { href: "/urunler" as const, label: t("products") },
    { href: "/referanslar" as const, label: t("references") },
    { href: "/iletisim" as const, label: t("contact") },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Celik Kalip Makina"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text)] hover:bg-red-50 hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-2 border-l border-gray-200 pl-2">
              <LanguageSwitcher />
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text)] hover:bg-red-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-3">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
