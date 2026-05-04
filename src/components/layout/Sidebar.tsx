import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Bell, 
  User, 
  LogOut,
  ChevronRight,
  Heart,
  Sparkles,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

function ThankYouScreen({ userName }: { userName: string }) {
  return (
    <div className="text-center py-2">
      <div className="relative mx-auto w-20 h-20 mb-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[1.75rem] opacity-20 blur-sm" />
        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[1.75rem] flex items-center justify-center shadow-xl shadow-teal-200">
          <Heart size={34} className="text-white fill-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
          <Sparkles size={10} className="text-white" />
        </div>
      </div>

      <h3 className="text-xl font-black text-white tracking-tight mb-2">
        ¡Hasta pronto, {userName.split(' ')[0]}!
      </h3>
      <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
        Gracias por usar <span className="font-bold text-[#95D5D2]">CitaFácil</span>. Tu salud es nuestra prioridad. 💙
      </p>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-left">
          <Shield size={14} className="text-[#95D5D2] mb-1.5" />
          <p className="text-[11px] font-bold text-white mb-0.5">Sesión cerrada</p>
          <p className="text-[10px] text-white/50 leading-snug">Datos seguros.</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-left">
          <Calendar size={14} className="text-amber-400 mb-1.5" />
          <p className="text-[11px] font-bold text-white mb-0.5">Te esperamos</p>
          <p className="text-[10px] text-white/50 leading-snug">Vuelve pronto.</p>
        </div>
      </div>

      <p className="text-[10px] text-white/40 font-medium mb-2">Redirigiendo...</p>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#95D5D2] to-teal-400 rounded-full"
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

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const menuItems = [
    { to: '/dashboard', label: 'Panel Principal', icon: LayoutDashboard },
    { to: '/appointments', label: 'Mis Citas', icon: Calendar },
    { to: '/new-appointment', label: 'Nueva Cita', icon: PlusCircle },
    { to: '/notifications', label: 'Notificaciones', icon: Bell },
    { to: '/profile', label: 'Mi Perfil', icon: User },
  ];

  const handleLogoutConfirm = () => {
    setShowThanks(true);
    setTimeout(() => {
      logout();
      setLogoutOpen(false);
      setShowThanks(false);
      navigate('/');
    }, 2200);
  };

  return (
    <aside className="w-72 bg-[#204E59] text-white flex flex-col h-screen sticky top-0 left-0 overflow-hidden shadow-2xl">
      <Modal
        isOpen={logoutOpen}
        onClose={() => { if (!showThanks) setLogoutOpen(false); }}
        title=""
        size="sm"
      >
        {showThanks ? (
          /* El fondo del modal es blanco, así que adaptamos los colores */
          <div className="text-center py-2">
            <div className="relative mx-auto w-20 h-20 mb-5">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[1.75rem] flex items-center justify-center shadow-xl shadow-teal-200">
                <Heart size={34} className="text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              ¡Hasta pronto, {user?.name.split(' ')[0]}!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
              Gracias por usar <span className="font-bold text-teal-600">CitaFácil</span>. Tu salud es nuestra prioridad. 💙
            </p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-left">
                <Shield size={14} className="text-teal-500 mb-1.5" />
                <p className="text-[11px] font-bold text-teal-800 mb-0.5">Sesión cerrada</p>
                <p className="text-[10px] text-teal-600 leading-snug">Datos seguros.</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-left">
                <Calendar size={14} className="text-amber-500 mb-1.5" />
                <p className="text-[11px] font-bold text-amber-800 mb-0.5">Te esperamos</p>
                <p className="text-[10px] text-amber-600 leading-snug">Vuelve pronto.</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mb-2">Redirigiendo...</p>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
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
        ) : (
          <div className="text-center">
            {user && (
              <div className="relative mx-auto w-16 h-16 mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=95d5d2`}
                  alt={user.name}
                  className="w-16 h-16 rounded-[1.25rem] border-4 border-white shadow-xl"
                />
              </div>
            )}
            <h3 className="text-lg font-black text-slate-900 mb-1">¿Salir por ahora?</h3>
            <p className="text-slate-500 text-sm mb-5">
              {user?.name.split(' ')[0]}, siempre es un placer tenerte aquí.
            </p>

            <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-100 text-teal-700 text-[11px] font-bold rounded-full">
                <Shield size={10} /> Datos protegidos
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-bold rounded-full">
                <Sparkles size={10} /> Sesión activa
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setLogoutOpen(false)} className="flex-1 text-sm">
                Seguir aquí
              </Button>
              <Button variant="danger" onClick={handleLogoutConfirm} className="flex-1 text-sm">
                <LogOut size={14} /> Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Brand */}
      <div className="p-8">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#95D5D2] rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:rotate-12 transition-transform duration-300">
            <Calendar size={24} className="text-[#204E59]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">CitaFácil</h1>
            <p className="text-[10px] text-[#95D5D2] font-bold uppercase tracking-widest mt-1">Manager Pro</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-[#95D5D2] text-[#204E59] shadow-lg shadow-black/10' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={isActive ? 'text-[#204E59]' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-6 mt-auto">
        <div className="bg-black/20 rounded-3xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}&backgroundColor=95d5d2`}
              alt={user?.name}
              className="w-10 h-10 rounded-xl bg-[#95D5D2]/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.name.split(' ')[0]}</p>
              <p className="text-[10px] text-white/50 font-medium truncate uppercase tracking-wider">Paciente</p>
            </div>
          </div>
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-[#F26C6D] text-white rounded-xl transition-all duration-300 font-bold text-xs"
          >
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </aside>
  );
}