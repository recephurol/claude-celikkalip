import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginAdmin, logoutAdmin, isAdminLoggedIn, getAdminUser } from '../lib/store';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(getAdminUser());

  function login(email: string, password: string): boolean {
    const success = loginAdmin(email, password);
    if (success) {
      setUser(getAdminUser());
    }
    return success;
  }

  function logout() {
    logoutAdmin();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAdminLoggedIn(), user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
