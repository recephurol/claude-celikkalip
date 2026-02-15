"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Reference {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  order: number;
  isActive: boolean;
}

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRef, setEditingRef] = useState<Reference | null>(null);
  const [formData, setFormData] = useState({ name: "", logoUrl: "", website: "", order: 0 });
  const [uploading, setUploading] = useState(false);

  const fetchReferences = useCallback(async () => {
    const res = await fetch("/api/references");
    setReferences(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchReferences(); }, [fetchReferences]);

  function resetForm() {
    setFormData({ name: "", logoUrl: "", website: "", order: 0 });
    setEditingRef(null);
    setShowForm(false);
  }

  function startEdit(ref: Reference) {
    setFormData({ name: ref.name, logoUrl: ref.logoUrl, website: ref.website || "", order: ref.order });
    setEditingRef(ref);
    setShowForm(true);
  }

  async function handleLogoUpload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setFormData((prev) => ({ ...prev, logoUrl: data.url }));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingRef) {
      await fetch("/api/references", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingRef.id, ...formData }),
      });
    } else {
      await fetch("/api/references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    resetForm();
    fetchReferences();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu referansi silmek istediginize emin misiniz?")) return;
    await fetch(`/api/references?id=${id}`, { method: "DELETE" });
    fetchReferences();
  }

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Referans Yonetimi</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Yeni Referans
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-8">
          <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">{editingRef ? "Referans Duzenle" : "Yeni Referans Ekle"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Firma Adi *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Web Sitesi</label>
                <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Logo *</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-[var(--color-text-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-sm">{uploading ? "Yukleniyor..." : "Logo Sec"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])} />
                  </label>
                  {formData.logoUrl && (
                    <div className="h-12 px-3 bg-white border border-[var(--color-border)] rounded-lg flex items-center">
                      <Image src={formData.logoUrl} alt="Logo" width={80} height={40} className="max-h-10 w-auto object-contain" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sira</label>
                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={!formData.logoUrl} className="px-6 py-2.5 gradient-primary text-white font-medium rounded-lg disabled:opacity-50">{editingRef ? "Guncelle" : "Ekle"}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-[var(--color-text)] font-medium rounded-lg">Iptal</button>
            </div>
          </form>
        </div>
      )}

      {references.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-[var(--color-border)] text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <p className="text-[var(--color-text-light)]">Henuz referans eklenmemis.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white rounded-xl p-5 shadow-sm border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[var(--color-primary)] text-sm">{ref.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(ref)} className="p-1.5 text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(ref.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <div className="bg-[var(--color-bg-alt)] rounded-lg p-4 flex items-center justify-center h-24">
                <Image src={ref.logoUrl} alt={ref.name} width={160} height={60} className="max-h-14 w-auto object-contain" />
              </div>
              {ref.website && <p className="text-xs text-[var(--color-text-light)] mt-2 truncate">{ref.website}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
