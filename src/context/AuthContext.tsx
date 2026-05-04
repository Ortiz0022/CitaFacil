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
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
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

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000));
    
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userIndex = registeredUsers.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex !== -1) {
      registeredUsers[userIndex].password = newPassword;
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      return true;
    }
    
    // Si es el usuario demo hardcodeado, también permitimos "resetearlo" guardándolo ahora
    if (email === 'juan.garcia@email.com') {
      const newUser = { ...mockUser, email, password: newPassword };
      registeredUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      return true;
    }

    return false;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (!user) return false;

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    let userIndex = registeredUsers.findIndex((u: any) => u.email.toLowerCase() === user.email.toLowerCase());

    // Si es el usuario demo y no está en registered_users, lo buscamos específicamente
    if (userIndex === -1 && user.email === 'juan.garcia@email.com') {
      if (currentPassword !== 'demo1234') {
        throw new Error('La contraseña actual es incorrecta.');
      }
      // Lo agregamos para que ahora sí esté en registered_users con la nueva pass
      const newUser = { ...mockUser, email: user.email, password: newPassword };
      registeredUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      return true;
    }

    if (userIndex !== -1) {
      if (registeredUsers[userIndex].password !== currentPassword) {
        throw new Error('La contraseña actual es incorrecta.');
      }
      registeredUsers[userIndex].password = newPassword;
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser, resetPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
