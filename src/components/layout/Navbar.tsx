import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, X, Calendar, Heart, Sparkles, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import Modal from '../ui/Modal';

// Pantalla de agradecimiento que reemplaza al modal tras cerrar sesión
function ThankYouScreen({ userName }: { userName: string }) {
  return (
    <div className="text-center py-2">
      {/* Animación de corazón */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[2rem] animate-pulse opacity-20" />
        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-teal-200">
          <Heart size={40} className="text-white fill-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
          <Sparkles size={12} className="text-white" />
        </div>
      </div>

      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
        ¡Hasta pronto, {userName.split(' ')[0]}!
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
        Gracias por confiar en <span className="font-bold text-teal-600">CitaFácil</span> para cuidar tu salud. Tu bienestar es nuestra misión. 💙
      </p>

      {/* Tarjetas de mensaje */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-left">
          <Shield size={18} className="text-teal-500 mb-2" />
          <p className="text-xs font-bold text-teal-800 mb-0.5">Sesión cerrada</p>
          <p className="text-[11px] text-teal-600 leading-snug">Tus datos están seguros y protegidos.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left">
          <Calendar size={18} className="text-amber-500 mb-2" />
          <p className="text-xs font-bold text-amber-800 mb-0.5">Te esperamos</p>
          <p className="text-[11px] text-amber-600 leading-snug">Tu agenda sigue disponible cuando vuelvas.</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 font-medium">
        Redirigiendo al portal principal...
      </p>

      {/* Barra de progreso animada */}
      <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
          style={{ animation: 'progressBar 2s linear forwards' }}
        />
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const unread = unreadCount;

  const handleLogoutConfirm = () => {
    setShowThanks(true);
    setTimeout(() => {
      logout();
      setLogoutOpen(false);
      setMobileOpen(false);
      setShowThanks(false);
      navigate('/');
    }, 2200);
  };

  const navLinks = [
    { to: '/dashboard', label: 'Panel' },
    { to: '/appointments', label: 'Mis Citas' },
    { to: '/new-appointment', label: 'Nueva Cita' },
    { to: '/notifications', label: 'Notificaciones' },
    { to: '/profile', label: 'Perfil' },
  ];

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <Modal
        isOpen={logoutOpen}
        onClose={() => { if (!showThanks) setLogoutOpen(false); }}
        title=""
        size="md"
      >
        {showThanks ? (
          <ThankYouScreen userName={user?.name || 'Usuario'} />
        ) : (
          <div className="text-center">
            {/* Avatar grande con glow */}
            {user && (
              <div className="relative mx-auto w-20 h-20 mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-teal-600 rounded-[1.75rem] opacity-20 blur-sm" />
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=2dd4bf`}
                  alt={user.name}
                  className="w-20 h-20 rounded-[1.75rem] border-4 border-white shadow-xl relative"
                />
              </div>
            )}

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">
              ¿Salir por ahora?
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {user?.name.split(' ')[0]}, siempre es un placer tenerte aquí.
            </p>

            {/* Info pills */}
            <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold rounded-full">
                <Shield size={11} />
                Datos protegidos
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-full">
                <Calendar size={11} />
                Cuenta: Paciente
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold rounded-full">
                <Sparkles size={11} />
                Sesión activa
              </span>
            </div>

            {/* Recordatorio */}
            <div className="bg-gradient-to-r from-teal-50 to-slate-50 border border-teal-100 rounded-2xl px-4 py-3 mb-6 text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-teal-700">Recuerda:</span> tus citas y datos médicos
                estarán seguros y disponibles cuando vuelvas. Puedes ingresar en cualquier momento.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={() => setLogoutOpen(false)}
                className="flex-1 px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-teal-200 transition-all duration-200"
              >
                Seguir aquí
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl font-bold text-sm hover:from-red-600 hover:to-rose-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-100"
              >
                <LogOut size={15} />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </Modal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 group-hover:scale-105 transition-transform">
              <Calendar size={20} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-xl tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              CitaFácil
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/notifications" className="relative p-2.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unread}
                </span>
              )}
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-100">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=2dd4bf`}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl bg-teal-100 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 leading-none">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Paciente</span>
                </div>
                <button
                  onClick={() => setLogoutOpen(true)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 py-3 px-4 bg-white animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 px-4 text-base font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setLogoutOpen(true)}
              className="flex items-center gap-3 w-full py-3 px-4 text-base font-semibold text-red-500 hover:bg-red-50 rounded-xl mt-2 transition-all"
            >
              <LogOut size={18} /> Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}