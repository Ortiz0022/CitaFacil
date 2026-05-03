import { useState } from 'react';
import { Search, Filter, Calendar, Edit2, X } from 'lucide-react';
import { useAppointments } from '../context/AppointmentsContext';
import type { Appointment, AppointmentStatus } from '../types';
import AppointmentCard from '../components/appointments/AppointmentCard';
// import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const STATUS_FILTERS: { label: string; value: AppointmentStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Programadas', value: 'scheduled' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Completadas', value: 'completed' },
  { label: 'Canceladas', value: 'cancelled' },
];

export default function AppointmentsPage() {
  const { appointments, cancelAppointment, updateAppointment } = useAppointments();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [editReason, setEditReason] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const filtered = appointments.filter(a => {
    const matchesSearch =
      a.professional.name.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase()) ||
      a.professional.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEdit = (appt: Appointment) => {
    setEditingAppt(appt);
    setEditReason(appt.reason);
    setEditNotes(appt.notes || '');
  };

  const saveEdit = () => {
    if (!editingAppt) return;
    updateAppointment(editingAppt.id, { reason: editReason, notes: editNotes });
    setEditingAppt(null);
  };

  const confirmCancel = () => {
    if (!cancelTarget) return;
    cancelAppointment(cancelTarget);
    setCancelTarget(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi Agenda</h1>
        <p className="text-slate-500 text-sm mt-1">Gestiona todas tus citas médicas</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por profesional, especialidad o motivo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Filter size={14} />
        <span>{filtered.length} cita{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Appointments */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <Calendar size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="font-medium text-slate-400">No se encontraron citas</p>
          <p className="text-sm text-slate-300 mt-1">Intenta con otros filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(appt => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onEdit={openEdit}
              onCancel={id => setCancelTarget(id)}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={!!editingAppt} onClose={() => setEditingAppt(null)} title="Editar cita" size="md">
        {editingAppt && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
              <img src={editingAppt.professional.avatar} alt="" className="w-10 h-10 rounded-lg" />
              <div>
                <p className="font-medium text-sm text-slate-900">{editingAppt.professional.name}</p>
                <p className="text-xs text-slate-500">
                  {format(parseISO(editingAppt.date), "d 'de' MMMM, yyyy", { locale: es })} · {editingAppt.time}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Motivo</label>
              <textarea
                value={editReason}
                onChange={e => setEditReason(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Notas adicionales</label>
              <textarea
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Opcional"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setEditingAppt(null)} className="flex-1">
                <X size={14} /> Cancelar
              </Button>
              <Button onClick={saveEdit} disabled={!editReason.trim()} className="flex-1">
                <Edit2 size={14} /> Guardar cambios
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel confirm modal */}
      <Modal isOpen={!!cancelTarget} onClose={() => setCancelTarget(null)} title="Cancelar cita" size="sm">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <X size={22} className="text-red-500" />
          </div>
          <div>
            <p className="font-medium text-slate-900">¿Cancelar esta cita?</p>
            <p className="text-sm text-slate-500 mt-1">Esta acción no se puede deshacer.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setCancelTarget(null)} className="flex-1">Volver</Button>
            <Button variant="danger" onClick={confirmCancel} className="flex-1">Sí, cancelar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
