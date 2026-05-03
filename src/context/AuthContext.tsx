import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (email && password.length >= 4) {
      // Intentar buscar el usuario en los registrados
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const foundUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        // No queremos guardar la contraseña en el estado global por seguridad (aunque sea demo)
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
        return true;
      }

      // Si no existe pero es el email por defecto de la demo
      if (email === 'juan.garcia@email.com' && password === 'demo1234') {
        setUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        return true;
      }

      return false;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    
    // Verificar si el correo ya existe
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const exists = registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists || email === 'juan.garcia@email.com') {
      throw new Error('El correo electrónico ya está registrado.');
    }

    const newUser = { 
      ...mockUser, 
      id: `u_${Date.now()}`, 
      name, 
      email,
      password // Guardamos la contraseña en el mock storage
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('auth_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
