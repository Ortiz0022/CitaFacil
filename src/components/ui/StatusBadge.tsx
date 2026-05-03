import type { AppointmentStatus } from '../../types';

interface BadgeProps {
  status: AppointmentStatus;
}

const config: Record<AppointmentStatus, { label: string; className: string }> = {
  scheduled: { label: 'Programada', className: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completada', className: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Cancelada', className: 'bg-red-100 text-red-600' },
  pending: { label: 'Pendiente', className: 'bg-amber-100 text-amber-700' },
};

export default function StatusBadge({ status }: BadgeProps) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
