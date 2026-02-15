import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import References from './pages/References';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminPages from './pages/admin/Pages';
import AdminReferences from './pages/admin/References';
import AdminMessages from './pages/admin/Messages';

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/urunler" element={<Products />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/referanslar" element={<References />} />
        <Route path="/iletisim" element={<Contact />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="urunler" element={<AdminProducts />} />
        <Route path="sayfalar" element={<AdminPages />} />
        <Route path="referanslar" element={<AdminReferences />} />
        <Route path="mesajlar" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}
