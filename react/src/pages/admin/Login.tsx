import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError(t('admin.invalid_credentials'));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-alt)]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="Celik Kalip Makina" className="h-14 w-auto mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-[var(--color-primary)]">{t('admin.panel')}</h1>
            <p className="text-sm text-[var(--color-text-light)] mt-1">{t('admin.login_title')}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t('admin.email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" placeholder="admin@celikkalipmakina.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">{t('admin.password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? t('admin.logging_in') : t('admin.login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
