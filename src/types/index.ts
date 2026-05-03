export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'patient' | 'admin';
  createdAt: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  availableDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  availableHours: string[];
  bio: string;
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'pending';

export interface Appointment {
  id: string;
  userId: string;
  professionalId: string;
  professional: Professional;
  date: string; // ISO date string
  time: string;
  reason: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'confirmation' | 'cancellation' | 'info';
  read: boolean;
  createdAt: string;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  reminderHours: number; // hours before appointment
}
