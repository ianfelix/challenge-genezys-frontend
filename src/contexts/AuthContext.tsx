'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types/session';

type AuthContextType = {
  user: User | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  user,
  logoutAction,
}: {
  children: ReactNode;
  user: User | null;
  logoutAction: () => Promise<void>;
}) {
  const logout = () => {
    logoutAction();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
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
