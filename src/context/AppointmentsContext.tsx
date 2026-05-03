import React, { createContext, useContext, useState } from 'react';
import type { Appointment, AppointmentStatus } from '../types';
import { mockAppointments } from '../data/mockData';

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  getByStatus: (status: AppointmentStatus) => Appointment[];
}

const AppointmentsContext = createContext<AppointmentsContextType | null>(null);

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

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
