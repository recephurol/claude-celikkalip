"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("admin");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError(t("invalid_credentials"));
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-bg-alt)]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Image src="/images/logo.png" alt="Çelik Kalıp Makina" width={180} height={60} className="h-14 w-auto mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-[var(--color-primary)]">{t("panel")}</h1>
            <p className="text-sm text-[var(--color-text-light)] mt-1">{t("login_title")}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" placeholder="admin@celikkalipmakina.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t("password")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? t("logging_in") : t("login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
