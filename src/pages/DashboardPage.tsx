import { Link } from 'react-router-dom';
import { CalendarPlus, CalendarCheck, Clock, XCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentsContext';
import AppointmentCard from '../components/appointments/AppointmentCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { format, isAfter, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DashboardPage() {
  const { user } = useAuth();
  const { appointments, cancelAppointment } = useAppointments();

  const scheduled = appointments.filter(a => a.status === 'scheduled');
  const pending = appointments.filter(a => a.status === 'pending');
  const completed = appointments.filter(a => a.status === 'completed');
  const cancelled = appointments.filter(a => a.status === 'cancelled');

  const upcoming = appointments
    .filter(a => (a.status === 'scheduled' || a.status === 'pending') && isAfter(parseISO(a.date), new Date()))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const today = format(new Date(), "EEEE d 'de' MMMM", { locale: es });

  const stats = [
    { label: 'Programadas', value: scheduled.length, icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pendientes', value: pending.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completadas', value: completed.length, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Canceladas', value: cancelled.length, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 capitalize">{today}</p>
          <h1 className="text-2xl font-bold text-slate-900">
            ¡Hola, {user?.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {upcoming.length > 0
              ? `Tienes ${upcoming.length} cita${upcoming.length !== 1 ? 's' : ''} próxima${upcoming.length !== 1 ? 's' : ''}`
              : 'No tienes citas próximas'}
          </p>
        </div>
        <Link to="/new-appointment">
          <Button size="md" className="gap-2">
            <CalendarPlus size={16} /> Nueva cita
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
          </Card>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Próximas citas</h2>
          <Link to="/appointments" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <Card className="p-8 text-center">
            <CalendarCheck size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No tienes citas próximas</p>
            <p className="text-sm text-slate-400 mt-1 mb-4">¡Agenda una cita con alguno de nuestros especialistas!</p>
            <Link to="/new-appointment">
              <Button variant="outline" size="sm">Programar cita</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map(appt => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onCancel={cancelAppointment}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/new-appointment', label: 'Nueva cita', icon: CalendarPlus, color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100' },
            { to: '/appointments', label: 'Ver agenda', icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100' },
            { to: '/notifications', label: 'Notificaciones', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100' },
            { to: '/profile', label: 'Mi perfil', icon: ArrowRight, color: 'text-slate-600', bg: 'bg-slate-50 hover:bg-slate-100' },
          ].map(({ to, label, icon: Icon, color, bg }) => (
            <Link key={to} to={to}>
              <div className={`${bg} rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors cursor-pointer`}>
                <Icon size={24} className={color} />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
