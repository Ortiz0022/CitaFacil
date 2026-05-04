import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Appointment, AppointmentStatus } from '../types';
import { useAuth } from './AuthContext';

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  getByStatus: (status: AppointmentStatus) => Appointment[];
}

const AppointmentsContext = createContext<AppointmentsContextType | null>(null);

function safeParseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const storageKey = useMemo(() => (user ? `appointments_${user.id}` : null), [user]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!storageKey) {
      setAppointments([]);
      return;
    }
    setAppointments(safeParseJson<Appointment[]>(localStorage.getItem(storageKey), []));
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(appointments));
  }, [appointments, storageKey]);

  const addAppointment = (appt: Appointment) => {
    setAppointments(prev => [appt, ...prev]);
  };

  const updateAppointment = (id: string, data: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
  };

  const getByStatus = (status: AppointmentStatus) => appointments.filter(a => a.status === status);

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, updateAppointment, cancelAppointment, getByStatus }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) throw new Error('useAppointments must be used within AppointmentsProvider');
  return ctx;
}
