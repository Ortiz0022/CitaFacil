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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <img
          src={professional.avatar}
          alt={professional.name}
          className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900 text-sm">{professional.name}</p>
              <p className="text-xs text-blue-600 font-medium">{professional.specialty}</p>
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
