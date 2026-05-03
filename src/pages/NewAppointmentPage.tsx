import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';
import { useAppointments } from '../context/AppointmentsContext';
import { useAuth } from '../context/AuthContext';
import { mockProfessionals } from '../data/mockData';
import type { Professional } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

type Step = 'professional' | 'datetime' | 'details';

export default function NewAppointmentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addAppointment } = useAppointments();

  const [step, setStep] = useState<Step>('professional');
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const today = startOfToday();

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOffset = getDay(startOfMonth(currentMonth));

  const isAvailableDay = (date: Date) => {
    if (!selectedPro) return false;
    if (isBefore(date, today)) return false;
    const dow = getDay(date);
    return selectedPro.availableDays.includes(dow);
  };

  const handleConfirm = () => {
    if (!selectedPro || !selectedDate || !selectedTime || !reason || !user) return;
    const newAppt = {
      id: `a_${Date.now()}`,
      userId: user.id,
      professionalId: selectedPro.id,
      professional: selectedPro,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      reason,
      notes,
      status: 'scheduled' as const,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };
    addAppointment(newAppt);
    navigate('/confirm', { state: { appointment: newAppt } });
  };

  const steps: { key: Step; label: string }[] = [
    { key: 'professional', label: 'Profesional' },
    { key: 'datetime', label: 'Fecha y Hora' },
    { key: 'details', label: 'Detalles' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Nueva Cita</h1>
        <p className="text-slate-500 text-sm mt-1">Programa tu próxima consulta médica</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center gap-2 ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-colors ${
                step === s.key ? 'bg-blue-600 text-white' :
                steps.indexOf(steps.find(x => x.key === step)!) > i ? 'bg-emerald-500 text-white' :
                'bg-slate-100 text-slate-400'
              }`}>{i + 1}</div>
              <span className={`text-sm font-medium hidden sm:block ${step === s.key ? 'text-blue-600' : 'text-slate-400'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-slate-200 ml-2" />}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Choose professional */}
      {step === 'professional' && (
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-700">Selecciona un profesional</h2>
          <div className="grid gap-3">
            {mockProfessionals.map(pro => (
              <Card
                key={pro.id}
                hover
                onClick={() => setSelectedPro(pro)}
                className={`p-4 transition-all ${selectedPro?.id === pro.id ? 'border-2 border-blue-500 shadow-md' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-xl bg-slate-100" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{pro.name}</p>
                    <p className="text-sm text-blue-600">{pro.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-slate-600">{pro.rating}</span>
                      <span className="text-xs text-slate-400">({pro.reviewCount} reseñas)</span>
                    </div>
                  </div>
                  {selectedPro?.id === pro.id && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{pro.bio}</p>
              </Card>
            ))}
          </div>
          <Button onClick={() => setStep('datetime')} disabled={!selectedPro} className="w-full" size="lg">
            Continuar
          </Button>
        </div>
      )}

      {/* Step 2: Date and time */}
      {step === 'datetime' && (
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-700">Selecciona fecha y hora</h2>

          {/* Calendar */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <ChevronLeft size={18} />
              </button>
              <span className="font-semibold text-slate-800 capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </span>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e${i}`} />)}
              {days.map(day => {
                const available = isAvailableDay(day);
                const selected = selectedDate && isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toISOString()}
                    disabled={!available}
                    onClick={() => { setSelectedDate(day); setSelectedTime(''); }}
                    className={`
                      aspect-square rounded-lg text-sm font-medium flex items-center justify-center transition-all
                      ${selected ? 'bg-blue-600 text-white' :
                        available ? 'hover:bg-blue-50 text-slate-700 hover:text-blue-600' :
                        'text-slate-300 cursor-not-allowed'}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Time slots */}
          {selectedDate && selectedPro && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-slate-500" />
                <span className="font-medium text-slate-700 text-sm">
                  Horarios disponibles — {format(selectedDate, "d 'de' MMMM", { locale: es })}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {selectedPro.availableHours.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('professional')} className="flex-1">
              <ChevronLeft size={16} /> Atrás
            </Button>
            <Button onClick={() => setStep('details')} disabled={!selectedDate || !selectedTime} className="flex-1">
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 'details' && (
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-700">Detalles de la cita</h2>

          {/* Summary */}
          {selectedPro && selectedDate && selectedTime && (
            <Card className="p-4 bg-blue-50 border-blue-100">
              <div className="flex items-center gap-3">
                <img src={selectedPro.avatar} alt={selectedPro.name} className="w-12 h-12 rounded-xl" />
                <div>
                  <p className="font-semibold text-slate-900">{selectedPro.name}</p>
                  <p className="text-sm text-blue-600">{selectedPro.specialty}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })} · {selectedTime}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Motivo de la cita *</label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Describe brevemente el motivo de tu consulta..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Notas adicionales (opcional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Alergias, medicamentos actuales, información relevante..."
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('datetime')} className="flex-1">
              <ChevronLeft size={16} /> Atrás
            </Button>
            <Button onClick={handleConfirm} disabled={!reason.trim()} variant="secondary" className="flex-1">
              Confirmar cita
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
