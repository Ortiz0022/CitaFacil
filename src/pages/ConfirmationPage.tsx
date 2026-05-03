import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, User, FileText, ArrowRight } from 'lucide-react';
import type { Appointment } from '../types';
import Button from '../components/ui/Button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ConfirmationPage() {
  const location = useLocation();
  
  const appointment = location.state?.appointment as Appointment | undefined;

  if (!appointment) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <p className="text-slate-500 mb-4">No hay información de cita disponible.</p>
        <Link to="/new-appointment">
          <Button>Programar nueva cita</Button>
        </Link>
      </div>
    );
  }

  const { professional, date, time, reason, notes } = appointment;
  const formattedDate = format(parseISO(date), "EEEE d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Success header */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">¡Cita confirmada!</h1>
        <p className="text-slate-500 mt-2">Tu cita ha sido programada exitosamente</p>
      </div>

      {/* Appointment summary */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
          <p className="text-blue-100 text-xs font-medium uppercase tracking-wide mb-1">Resumen de cita</p>
          <p className="text-white font-bold text-lg">#{appointment.id.toUpperCase()}</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Professional */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <img src={professional.avatar} alt={professional.name} className="w-14 h-14 rounded-xl bg-slate-100" />
            <div>
              <p className="font-semibold text-slate-900">{professional.name}</p>
              <p className="text-sm text-blue-600">{professional.specialty}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Fecha</p>
                <p className="font-medium text-slate-700 capitalize">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Hora</p>
                <p className="font-medium text-slate-700">{time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Motivo</p>
                <p className="font-medium text-slate-700">{reason}</p>
              </div>
            </div>

            {notes && (
              <div className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={14} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Notas</p>
                  <p className="text-slate-600">{notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700">
        <p className="font-medium mb-1">📧 Confirmación enviada</p>
        <p className="text-blue-600">Recibirás un recordatorio 24 horas antes de tu cita.</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link to="/appointments">
          <Button className="w-full gap-2" size="lg">
            Ver mis citas <ArrowRight size={16} />
          </Button>
        </Link>
        <Link to="/new-appointment">
          <Button variant="outline" className="w-full" size="lg">
            Programar otra cita
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="ghost" className="w-full" size="md">
            Ir al panel principal
          </Button>
        </Link>
      </div>
    </div>
  );
}
