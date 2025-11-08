"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isClientAuthenticated, oauthLogout } from '@/lib/services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 使用 setTimeout 来避免在 effect 中直接调用 setState
    const timer = setTimeout(() => {
      setIsAuthenticated(isClientAuthenticated());
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const login = () => {
    // 在这个应用中，登录是通过OAuth重定向处理的
    // 这里只是更新本地状态
    setIsAuthenticated(true);
  };

  const logout = () => {
    oauthLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}