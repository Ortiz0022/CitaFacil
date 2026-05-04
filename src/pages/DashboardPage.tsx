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
    { label: 'Programadas', value: scheduled.length, icon: CalendarCheck, color: 'text-[#204E59]', bg: 'bg-[#95D5D2]/20' },
    { label: 'Pendientes', value: pending.length, icon: Clock, color: 'text-[#635671]', bg: 'bg-[#635671]/10' },
    { label: 'Completadas', value: completed.length, icon: TrendingUp, color: 'text-[#66B2B2]', bg: 'bg-[#66B2B2]/10' },
    { label: 'Canceladas', value: cancelled.length, icon: XCircle, color: 'text-[#F26C6D]', bg: 'bg-[#F26C6D]/10' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-[#95D5D2]/20 border border-[#95D5D2]/30 rounded-full">
              <p className="text-[10px] font-black text-[#204E59] uppercase tracking-[0.2em]">{today}</p>
            </div>
          </div>
          <h1 className="text-5xl font-black text-[#204E59] tracking-tighter leading-tight">
            Hola, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 text-lg mt-2 font-medium">
            {upcoming.length > 0
              ? `Tienes ${upcoming.length} compromiso${upcoming.length !== 1 ? 's' : ''} en tu agenda.`
              : 'Hoy es un buen día para organizar tu salud.'}
          </p>
        </div>
        <Link to="/new-appointment">
          <Button size="lg" className="h-16 px-10 text-base font-black shadow-2xl shadow-[#204E59]/20">
            <CalendarPlus size={20} /> Nueva Cita
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-8 border-transparent bg-white shadow-xl shadow-[#204E59]/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                <Icon size={28} className={color} />
              </div>
              <span className={`text-4xl font-black ${color} tracking-tighter`}>{value}</span>
            </div>
            <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">{label}</p>
          </Card>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-[#204E59] rounded-full" />
            <h2 className="text-3xl font-black text-[#204E59] tracking-tighter">Agenda Próxima</h2>
          </div>
          <Link to="/appointments" className="text-sm font-black text-[#66B2B2] hover:text-[#204E59] transition-colors bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 group">
            Ver Calendario <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2 border-[#95D5D2]/30 bg-white/50 backdrop-blur-sm">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl shadow-[#204E59]/5 flex items-center justify-center mx-auto mb-8 text-[#95D5D2]">
              <CalendarCheck size={48} />
            </div>
            <h3 className="text-2xl font-black text-[#204E59] mb-3">Agenda Despejada</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed text-lg">No tienes compromisos pendientes por ahora. ¿Quieres agendar algo nuevo?</p>
            <Link to="/new-appointment">
              <Button variant="outline" className="h-14 px-8 font-black border-[#95D5D2]/50 text-[#204E59]">Programar Ahora</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Special Offer / Banner */}
      <div className="relative overflow-hidden bg-[#635671] rounded-[3rem] p-12 text-white shadow-2xl shadow-[#635671]/30">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 px-4 py-2 rounded-full border border-white/10 mb-6 inline-block">Membresía Premium</span>
          <h2 className="text-4xl font-black mb-6 tracking-tighter">Tu salud, <br />nuestra prioridad.</h2>
          <p className="text-lg text-white/70 mb-8 font-medium leading-relaxed">Accede a especialistas VIP y recordatorios inteligentes con nuestro plan avanzado.</p>
          <Button className="bg-[#FF9E7D] hover:bg-[#E88E6E] text-[#204E59] font-black h-14 px-8 shadow-xl shadow-black/20">
            Mejorar Plan <ArrowRight size={18} />
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
