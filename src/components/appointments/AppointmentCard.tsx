import { Calendar, Clock, User } from 'lucide-react';
import type { Appointment } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onEdit?: (appointment: Appointment) => void;
  compact?: boolean;
}

export default function AppointmentCard({ appointment, onCancel, onEdit, compact = false }: AppointmentCardProps) {
  const { professional, date, time, reason, status } = appointment;
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="bg-white rounded-3xl border border-[#95D5D2]/30 shadow-sm hover:shadow-xl hover:border-[#204E59]/20 transition-all duration-500 p-6 group">
      <div className="flex items-start gap-5">
        <div className="relative">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="w-16 h-16 rounded-2xl object-cover bg-[#95D5D2]/10 flex-shrink-0 border-2 border-white shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#66B2B2] border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-black text-[#204E59] text-lg leading-tight">{professional.name}</p>
              <p className="text-[10px] text-[#66B2B2] font-black tracking-widest uppercase mt-0.5">{professional.specialty}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          {!compact && (
            <p className="text-sm text-slate-600 mt-1.5 line-clamp-1">{reason}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      {!compact && (status === 'scheduled' || status === 'pending') && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
          {onEdit && (
            <Button size="sm" variant="outline" onClick={() => onEdit(appointment)} className="flex-1">
              <User size={13} /> Editar
            </Button>
          )}
          {onCancel && (
            <Button size="sm" variant="ghost" onClick={() => onCancel(appointment.id)} className="flex-1 text-red-500 hover:bg-red-50">
              Cancelar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
