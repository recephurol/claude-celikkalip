import { useState } from 'react';
import { getPages, updatePage, PageContent } from '../../lib/store';

export default function AdminPages() {
  const [pages, setPages] = useState<PageContent[]>(getPages());
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  function refresh() {
    setPages(getPages());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPage) return;
    updatePage(editingPage.id, formData);
    setEditingPage(null);
    refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Sayfa Icerik Yonetimi</h1>

      {editingPage && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-8">
          <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">Duzenle: {editingPage.slug}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Baslik</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icerik</label>
              <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={12} required className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none resize-none font-mono text-sm" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 gradient-primary text-white font-medium rounded-lg">Kaydet</button>
              <button type="button" onClick={() => setEditingPage(null)} className="px-6 py-2.5 bg-gray-100 text-[var(--color-text)] font-medium rounded-lg">Iptal</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[var(--color-primary)]">{page.title}</h3>
                  <span className="text-xs bg-[var(--color-bg-alt)] text-[var(--color-text-light)] px-2 py-1 rounded">{page.slug}</span>
                </div>
                <p className="text-sm text-[var(--color-text-light)] line-clamp-3">{page.content}</p>
              </div>
              <button
                onClick={() => { setEditingPage(page); setFormData({ title: page.title, content: page.content }); }}
                className="ml-4 p-2 text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] rounded-lg shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
