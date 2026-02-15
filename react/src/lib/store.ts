// localStorage-based data store for Celik Kalip Makina

export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  order: number;
}

export interface Product {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  isActive: boolean;
  order: number;
  images: ProductImage[];
}

export interface PageContent {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export interface Reference {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  order: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const KEYS = {
  products: 'ck_products',
  pages: 'ck_pages',
  references: 'ck_references',
  messages: 'ck_messages',
  auth: 'ck_auth',
  nextId: 'ck_next_id',
};

// --- Initial data ---
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, title: 'Celik Kalip', description: 'Yuksek hassasiyetli celik kalip imalati. CNC isleme ve erozyon ile mikron seviyesinde hassasiyet.', category: 'Kalip', isActive: true, order: 1, images: [{ id: 1, url: '/images/urun1.jpg', alt: 'Celik Kalip', order: 1 }] },
  { id: 2, title: 'Plastik Enjeksiyon Kaliplari', description: 'Her turlu plastik enjeksiyon kalibi tasarim ve uretimi. Cok gozlu ve sicak yolluk sistemleri.', category: 'Kalip', isActive: true, order: 2, images: [{ id: 2, url: '/images/urun2.jpg', alt: 'Plastik Enjeksiyon', order: 1 }] },
  { id: 3, title: 'Kaucuk Kaliplari', description: 'Kaucuk ve silikon urunler icin kalip uretimi. Yuksek sicaklik dayanimi ve uzun omurlu.', category: 'Kalip', isActive: true, order: 3, images: [{ id: 3, url: '/images/urun3.jpg', alt: 'Kaucuk Kaliplari', order: 1 }] },
  { id: 4, title: 'Pres Kaliplari', description: 'Sac metal sekillendirme icin pres kaliplari. Kesme, bukme ve derin cekme operasyonlari.', category: 'Kalip', isActive: true, order: 4, images: [{ id: 4, url: '/images/urun4.jpg', alt: 'Pres Kaliplari', order: 1 }] },
  { id: 5, title: 'CNC Isleme', description: 'CNC freze ve torna ile hassas parcalarin imalati. 3, 4 ve 5 eksenli isleme kapasitesi.', category: 'Isleme', isActive: true, order: 5, images: [{ id: 5, url: '/images/urun5.jpg', alt: 'CNC Isleme', order: 1 }] },
  { id: 6, title: 'Tel Erozyon', description: 'Tel erozyon ile hassas kesim ve sekillendirme. Mikron seviyesinde toleranslar.', category: 'Isleme', isActive: true, order: 6, images: [{ id: 6, url: '/images/urun6.jpg', alt: 'Tel Erozyon', order: 1 }] },
  { id: 7, title: 'Dalma Erozyon', description: 'Dalma erozyon ile karmasik geometrilerin olusturulmasi. Grafik ve bakir elektrot kullanimi.', category: 'Isleme', isActive: true, order: 7, images: [{ id: 7, url: '/images/urun7.jpg', alt: 'Dalma Erozyon', order: 1 }] },
  { id: 8, title: 'Taslama', description: 'Duzlem ve silindirik taslama islemleri. Yuzey puruzsuzlugu ve boyutsal hassasiyet.', category: 'Isleme', isActive: true, order: 8, images: [{ id: 8, url: '/images/urun8.jpg', alt: 'Taslama', order: 1 }] },
];

const INITIAL_PAGES: PageContent[] = [
  {
    id: 1,
    slug: 'hakkimizda',
    title: 'Celik Kalip Makina',
    content:
      '20 yili askin tecrubemizle, Bursa\'da celik kalip imalati sektorunde lider konumdayiz. Modern CNC tezgahlarimiz ve uzman kadromuzla, musteri ihtiyaclarina ozel cozumler uretiyoruz.\n\nISO 9001 kalite yonetim sistemi cercevesinde calisan firmamiz, otomotiv, beyaz esya, elektronik ve savunma sanayi basta olmak uzere bircok sektore hizmet vermektedir.\n\nSurekli yatirim ve inovasyon anlayisimizla, en son teknoloji tezgahlar ve yazilimlar kullanarak musterilerimize en yuksek kalitede urunler sunmaktayiz.',
  },
  {
    id: 2,
    slug: 'hizmetler',
    title: 'Hizmetlerimiz',
    content:
      'Celik kalip imalati, plastik enjeksiyon kaliplari, kaucuk kaliplari, pres kaliplari, CNC isleme, tel erozyon, dalma erozyon ve taslama hizmetleri sunmaktayiz.',
  },
];

const INITIAL_REFERENCES: Reference[] = [
  { id: 1, name: 'Referans 1', logoUrl: '/images/referans1.png', website: null, order: 1, isActive: true },
  { id: 2, name: 'Referans 2', logoUrl: '/images/referans2.png', website: null, order: 2, isActive: true },
  { id: 3, name: 'Referans 3', logoUrl: '/images/referans3.jpg', website: null, order: 3, isActive: true },
  { id: 4, name: 'Referans 4', logoUrl: '/images/referans4.jpg', website: null, order: 4, isActive: true },
];

// --- Helpers ---
function getData<T>(key: string, initial: T): T {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initial;
    }
  }
  return initial;
}

function setData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function getNextId(collection: string): number {
  const ids = getData<Record<string, number>>(KEYS.nextId, {});
  const current = ids[collection] || 100;
  ids[collection] = current + 1;
  setData(KEYS.nextId, ids);
  return current;
}

// --- Products ---
export function getProducts(): Product[] {
  return getData<Product[]>(KEYS.products, INITIAL_PRODUCTS);
}

export function saveProducts(products: Product[]): void {
  setData(KEYS.products, products);
}

export function addProduct(data: { title: string; description: string; category: string; order: number }): Product {
  const products = getProducts();
  const product: Product = {
    id: getNextId('products'),
    title: data.title,
    description: data.description || null,
    category: data.category || null,
    isActive: true,
    order: data.order || products.length + 1,
    images: [],
  };
  products.push(product);
  saveProducts(products);
  return product;
}

export function updateProduct(id: number, data: Partial<Product>): void {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx >= 0) {
    products[idx] = { ...products[idx], ...data };
    saveProducts(products);
  }
}

export function deleteProduct(id: number): void {
  saveProducts(getProducts().filter((p) => p.id !== id));
}

export function addProductImage(productId: number, url: string, alt: string): void {
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (product) {
    product.images.push({
      id: getNextId('images'),
      url,
      alt,
      order: product.images.length + 1,
    });
    saveProducts(products);
  }
}

export function deleteProductImage(imageId: number): void {
  const products = getProducts();
  for (const product of products) {
    product.images = product.images.filter((img) => img.id !== imageId);
  }
  saveProducts(products);
}

// --- Pages ---
export function getPages(): PageContent[] {
  return getData<PageContent[]>(KEYS.pages, INITIAL_PAGES);
}

export function updatePage(id: number, data: { title: string; content: string }): void {
  const pages = getPages();
  const idx = pages.findIndex((p) => p.id === id);
  if (idx >= 0) {
    pages[idx] = { ...pages[idx], ...data };
    setData(KEYS.pages, pages);
  }
}

// --- References ---
export function getReferences(): Reference[] {
  return getData<Reference[]>(KEYS.references, INITIAL_REFERENCES);
}

export function addReference(data: { name: string; logoUrl: string; website: string; order: number }): Reference {
  const refs = getReferences();
  const ref: Reference = {
    id: getNextId('references'),
    name: data.name,
    logoUrl: data.logoUrl,
    website: data.website || null,
    order: data.order || refs.length + 1,
    isActive: true,
  };
  refs.push(ref);
  setData(KEYS.references, refs);
  return ref;
}

export function updateReference(id: number, data: Partial<Reference>): void {
  const refs = getReferences();
  const idx = refs.findIndex((r) => r.id === id);
  if (idx >= 0) {
    refs[idx] = { ...refs[idx], ...data };
    setData(KEYS.references, refs);
  }
}

export function deleteReference(id: number): void {
  setData(KEYS.references, getReferences().filter((r) => r.id !== id));
}

// --- Messages ---
export function getMessages(): ContactMessage[] {
  return getData<ContactMessage[]>(KEYS.messages, []);
}

export function addMessage(data: { name: string; phone: string; email: string; message: string }): ContactMessage {
  const messages = getMessages();
  const msg: ContactMessage = {
    id: getNextId('messages'),
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(msg);
  setData(KEYS.messages, messages);
  return msg;
}

export function toggleMessageRead(id: number): void {
  const messages = getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.isRead = !msg.isRead;
    setData(KEYS.messages, messages);
  }
}

export function deleteMessage(id: number): void {
  setData(KEYS.messages, getMessages().filter((m) => m.id !== id));
}

// --- Auth ---
const ADMIN_EMAIL = 'admin@celikkalipmakina.com';
const ADMIN_PASSWORD = 'Celik2024!';

export function loginAdmin(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(KEYS.auth, JSON.stringify({ email, name: 'Admin', loggedIn: true }));
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(KEYS.auth);
}

export function isAdminLoggedIn(): boolean {
  const auth = localStorage.getItem(KEYS.auth);
  if (!auth) return false;
  try {
    return JSON.parse(auth).loggedIn === true;
  } catch {
    return false;
  }
}

export function getAdminUser(): { email: string; name: string } | null {
  const auth = localStorage.getItem(KEYS.auth);
  if (!auth) return null;
  try {
    const data = JSON.parse(auth);
    if (data.loggedIn) return { email: data.email, name: data.name };
  } catch {}
  return null;
}

// --- File to Base64 ---
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
