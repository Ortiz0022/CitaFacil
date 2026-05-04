import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Notification, NotificationSettings } from '../types';
import { useAuth } from './AuthContext';

interface NotificationsContextType {
  notifications: Notification[];
  settings: NotificationSettings;
  setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  emailEnabled: true,
  smsEnabled: false,
  pushEnabled: true,
  reminderHours: 24,
};

const NotificationsContext = createContext<NotificationsContextType | null>(null);

function safeParseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const storageKey = user ? `notifications_${user.id}` : null;
  const settingsKey = user ? `notification_settings_${user.id}` : null;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!storageKey || !settingsKey) {
      setNotifications([]);
      setSettings(DEFAULT_SETTINGS);
      return;
    }

    setNotifications(safeParseJson<Notification[]>(localStorage.getItem(storageKey), []));
    setSettings(safeParseJson<NotificationSettings>(localStorage.getItem(settingsKey), DEFAULT_SETTINGS));
  }, [storageKey, settingsKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(notifications));
  }, [notifications, storageKey]);

  useEffect(() => {
    if (!settingsKey) return;
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }, [settings, settingsKey]);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, settings, setSettings, markRead, markAllRead, unreadCount, setNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}
