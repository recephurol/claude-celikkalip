import { useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, addProductImage, deleteProductImage, fileToBase64, Product } from '../../lib/store';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', order: 0 });
  const [uploading, setUploading] = useState(false);

  function refresh() {
    setProducts(getProducts());
  }

  function resetForm() {
    setFormData({ title: '', description: '', category: '', order: 0 });
    setEditingProduct(null);
    setShowForm(false);
  }

  function startEdit(p: Product) {
    setFormData({ title: p.title, description: p.description || '', category: p.category || '', order: p.order });
    setEditingProduct(p);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    resetForm();
    refresh();
  }

  function handleDelete(id: number) {
    if (!confirm('Bu urunu silmek istediginize emin misiniz?')) return;
    deleteProduct(id);
    refresh();
  }

  async function handleImageUpload(productId: number, files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      const base64 = await fileToBase64(file);
      addProductImage(productId, base64, file.name);
    }
    setUploading(false);
    refresh();
  }

  function handleImageDelete(imageId: number) {
    deleteProductImage(imageId);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Urun Yonetimi</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Yeni Urun
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-8">
          <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">{editingProduct ? 'Urun Duzenle' : 'Yeni Urun Ekle'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Baslik *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Aciklama</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 gradient-primary text-white font-medium rounded-lg">{editingProduct ? 'Guncelle' : 'Ekle'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-[var(--color-text)] font-medium rounded-lg">Iptal</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-primary)]">{product.title}</h3>
                {product.category && <span className="text-xs bg-[var(--color-bg-alt)] text-[var(--color-text-light)] px-2 py-1 rounded mt-1 inline-block">{product.category}</span>}
                {product.description && <p className="text-sm text-[var(--color-text-light)] mt-2">{product.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(product)} className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-sm font-medium">Fotograflar ({product.images.length})</h4>
                <label className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[var(--color-primary)] text-white rounded-lg cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Fotograf Ekle
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleImageUpload(product.id, e.target.files)} />
                </label>
                {uploading && <span className="text-xs text-[var(--color-text-light)]">Yukleniyor...</span>}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={img.url} alt={img.alt || ''} className="w-24 h-24 object-cover rounded-lg border border-[var(--color-border)]" />
                    <button onClick={() => handleImageDelete(img.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
