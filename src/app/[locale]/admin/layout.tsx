"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import SessionProvider from "@/components/SessionProvider";
import { Link } from "@/i18n/routing";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("admin");

  const isLoginPage = pathname.includes("/admin/login");

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [status, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]" />
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { href: "/admin" as const, label: t("dashboard"), icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "/admin/urunler" as const, label: t("products"), icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { href: "/admin/sayfalar" as const, label: t("pages"), icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { href: "/admin/referanslar" as const, label: t("references"), icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { href: "/admin/mesajlar" as const, label: t("messages"), icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  return (
    <div className="min-h-[80vh] bg-[var(--color-bg-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[var(--color-primary)]">{t("panel")}</h2>
            <nav className="hidden md:flex gap-1 ml-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname.endsWith(item.href) || (item.href === "/admin" && pathname.match(/\/admin\/?$/)) ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-light)] hover:bg-white hover:text-[var(--color-primary)]"}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-light)]">{session.user?.name}</span>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">{t("logout")}</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
