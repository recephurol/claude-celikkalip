"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";

const flags: Record<string, string> = {
  tr: "/images/flag-tr.svg",
  en: "/images/flag-en.svg",
  de: "/images/flag-de.svg",
  ru: "/images/flag-ru.svg",
  fr: "/images/flag-fr.svg",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
      >
        <span className="text-base">{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[var(--color-border)] py-1 min-w-[160px] z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === l
                  ? "bg-red-50 text-[var(--color-primary)] font-semibold"
                  : "text-[var(--color-text)] hover:bg-gray-50"
              }`}
            >
              <span className="font-medium uppercase w-6">{l}</span>
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
