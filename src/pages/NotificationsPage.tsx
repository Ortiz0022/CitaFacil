import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Clock, CheckCircle2, Save } from 'lucide-react';
import { mockNotifications, mockNotificationSettings } from '../data/mockData';
import type { NotificationSettings } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const typeConfig = {
  reminder: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Recordatorio' },
  confirmation: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Confirmación' },
  cancellation: { icon: Bell, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelación' },
  info: { icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Info' },
};

const REMINDER_OPTIONS = [
  { value: 1, label: '1 hora antes' },
  { value: 6, label: '6 horas antes' },
  { value: 12, label: '12 horas antes' },
  { value: 24, label: '24 horas antes' },
  { value: 48, label: '2 días antes' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(mockNotificationSettings);
  const [saved, setSaved] = useState(false);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const saveSettings = async () => {
    await new Promise(r => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notificaciones</h1>
        <p className="text-slate-500 text-sm mt-1">Revisa y configura tus alertas</p>
      </div>

      {/* Notifications list */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-slate-600" />
            <h3 className="font-semibold text-slate-900">Recientes</h3>
            {unread > 0 && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">{unread}</span>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">
              Marcar todas como leídas
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-50">
          {notifications.map(notif => {
            const { icon: Icon, color, bg } = typeConfig[notif.type];
            return (
              <div
                key={notif.id}
                className={`px-6 py-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
                onClick={() => markRead(notif.id)}
              >
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {format(parseISO(notif.createdAt), "d MMM · HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Preferencias de notificación</h3>

        <div className="space-y-4">
          {/* Channels */}
          {[
            { key: 'emailEnabled' as const, icon: Mail, label: 'Correo electrónico', desc: 'Recibe notificaciones en tu email' },
            { key: 'smsEnabled' as const, icon: MessageSquare, label: 'Mensajes de texto', desc: 'Notificaciones por SMS' },
            { key: 'pushEnabled' as const, icon: Smartphone, label: 'Notificaciones push', desc: 'Alertas en tu dispositivo' },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                  <Icon size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings[key] ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${settings[key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}

          {/* Reminder timing */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                <Clock size={18} className="text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Recordatorio anticipado</p>
                <p className="text-xs text-slate-500">¿Con cuánta anticipación quieres ser notificado?</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {REMINDER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSettings(prev => ({ ...prev, reminderHours: opt.value }))}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                    settings.reminderHours === opt.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-2 mt-4 text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5 text-sm">
            <CheckCircle2 size={16} /> Configuración guardada
          </div>
        )}

        <Button onClick={saveSettings} className="mt-4 gap-2">
          <Save size={14} /> Guardar configuración
        </Button>
      </Card>
    </div>
  );
}
