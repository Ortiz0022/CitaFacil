import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, X, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockData';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = mockNotifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
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
                  onClick={handleLogout}
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
              onClick={handleLogout}
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
