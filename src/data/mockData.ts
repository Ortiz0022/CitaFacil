import type { Professional, Appointment, Notification, NotificationSettings } from '../types';

function createRng(seed: number) {
  // Linear congruential generator (deterministic, lightweight)
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function pickOne<T>(rng: () => number, items: T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function intBetween(rng: () => number, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatIso(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${formatDate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const now = new Date();
const runtimeSeed =
  Math.floor(Math.random() * 1_000_000_000) ^
  (now.getFullYear() * 10_000 + (now.getMonth() + 1) * 100 + now.getDate());
const rng = createRng(runtimeSeed);

const firstNames = ['Ana', 'Sofía', 'María', 'Valeria', 'Laura', 'Daniel', 'Carlos', 'Luis', 'Jorge', 'Andrés', 'Paula', 'Camila'];
const lastNames = ['Martínez', 'Rodríguez', 'Herrera', 'Pacheco', 'Jiménez', 'Vargas', 'Morales', 'Soto', 'Gómez', 'Navarro', 'Rojas', 'Castro'];
const specialties = ['Medicina General', 'Cardiología', 'Dermatología', 'Ortopedia', 'Pediatría', 'Ginecología', 'Neurología', 'Nutrición'];
const bios = [
  'Atención centrada en el paciente con enfoque preventivo y seguimiento integral.',
  'Experiencia clínica sólida y comunicación clara para resolver tus dudas.',
  'Enfoque en diagnóstico oportuno y tratamientos basados en evidencia.',
  'Acompañamiento cercano, plan de cuidado personalizado y educación en salud.',
];

function randomFullName() {
  const fn = pickOne(rng, firstNames);
  const ln = pickOne(rng, lastNames);
  const isFemale = ['Ana', 'Sofía', 'María', 'Valeria', 'Laura', 'Paula', 'Camila'].includes(fn);
  const prefix = isFemale ? 'Dra.' : 'Dr.';
  return `${prefix} ${fn} ${ln}`;
}

function randomAvailableDays() {
  const days = [1, 2, 3, 4, 5, 6];
  const count = intBetween(rng, 3, 5);
  const selected: number[] = [];
  while (selected.length < count) {
    const d = pickOne(rng, days);
    if (!selected.includes(d)) selected.push(d);
  }
  return selected.sort((a, b) => a - b);
}

function randomAvailableHours() {
  const base = ['07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  const count = intBetween(rng, 8, 12);
  const selected: string[] = [];
  while (selected.length < count) {
    const h = pickOne(rng, base);
    if (!selected.includes(h)) selected.push(h);
  }
  return selected.sort();
}

function dateFromNow(daysOffset: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d;
}

export const mockProfessionals: Professional[] = Array.from({ length: 5 }).map((_, idx) => {
  const name = randomFullName();
  const specialty = pickOne(rng, specialties);
  const rating = Math.round((4.4 + rng() * 0.6) * 10) / 10;
  const reviewCount = intBetween(rng, 30, 340);
  const availableDays = randomAvailableDays();
  const availableHours = randomAvailableHours();
  const seed = encodeURIComponent(name);
  const bg = pickOne(rng, ['b6e3f4', 'ffd5dc', 'c0aede', 'd1f4e0', 'ffdfbf', '95d5d2', 'fde68a']);

  return {
    id: `p${idx + 1}`,
    name,
    specialty,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}`,
    rating,
    reviewCount,
    availableDays,
    availableHours,
    bio: pickOne(rng, bios),
  };
});

const userFirstName = pickOne(rng, firstNames);
const userLastName = pickOne(rng, lastNames);
export const mockUser = {
  id: 'u1',
  name: `${userFirstName} ${userLastName}`,
  email: `${userFirstName}.${userLastName}`.toLowerCase() + '@email.com',
  phone: `+506 ${intBetween(rng, 7000, 8999)}-${intBetween(rng, 1000, 9999)}`,
  role: 'patient' as const,
  createdAt: formatDate(dateFromNow(-intBetween(rng, 200, 900))),
};

const reasons = [
  'Consulta de rutina anual',
  'Dolor de cabeza recurrente',
  'Revisión preventiva',
  'Control de presión arterial',
  'Seguimiento de tratamiento',
  'Revisión de piel',
  'Dolor articular',
  'Control pediátrico',
];

const notesList = [
  'Traer exámenes recientes si los tienes',
  'Llegar 10 minutos antes',
  'Evitar cafeína 4 horas antes',
  'Anotar síntomas y medicamentos',
];

export const mockAppointments: Appointment[] = Array.from({ length: 5 }).map((_, idx) => {
  const pro = pickOne(rng, mockProfessionals);
  const status = pickOne(rng, ['scheduled', 'completed', 'pending', 'cancelled'] as const);
  const isFuture = status === 'scheduled' || status === 'pending';
  const dayOffset = isFuture ? intBetween(rng, 2, 30) : -intBetween(rng, 5, 60);
  const apptDate = dateFromNow(dayOffset);
  const createdAt = dateFromNow(dayOffset - intBetween(rng, 3, 20));
  const time = pickOne(rng, pro.availableHours);

  return {
    id: `a${idx + 1}`,
    userId: 'u1',
    professionalId: pro.id,
    professional: pro,
    date: formatDate(apptDate),
    time,
    reason: pickOne(rng, reasons),
    notes: rng() > 0.5 ? pickOne(rng, notesList) : undefined,
    status,
    createdAt: formatDate(createdAt),
  };
});

export const mockNotifications: Notification[] = Array.from({ length: 3 }).map((_, idx) => {
  const appt = pickOne(rng, mockAppointments);
  const proName = appt.professional.name;
  const type = pickOne(rng, ['reminder', 'confirmation', 'cancellation', 'info'] as const);
  const titleMap: Record<(typeof type)[number], string> = {
    reminder: 'Recordatorio de cita',
    confirmation: 'Cita confirmada',
    cancellation: 'Cita cancelada',
    info: 'Información',
  };
  const msgMap: Record<(typeof type)[number], string> = {
    reminder: `Tienes una cita con ${proName} el ${appt.date} a las ${appt.time}`,
    confirmation: `Tu cita con ${proName} el ${appt.date} fue confirmada.`,
    cancellation: `Tu cita con ${proName} del ${appt.date} fue cancelada.`,
    info: 'Puedes gestionar tus notificaciones desde la sección de ajustes.',
  };
  const createdAt = dateFromNow(-intBetween(rng, 0, 25));
  createdAt.setHours(intBetween(rng, 8, 19), pickOne(rng, [0, 15, 30, 45]), 0, 0);

  return {
    id: `n${idx + 1}`,
    userId: 'u1',
    title: titleMap[type],
    message: msgMap[type],
    type,
    read: rng() > 0.6,
    createdAt: formatIso(createdAt),
  };
});

export const mockNotificationSettings: NotificationSettings = {
  emailEnabled: true,
  smsEnabled: false,
  pushEnabled: true,
  reminderHours: 24,
};
