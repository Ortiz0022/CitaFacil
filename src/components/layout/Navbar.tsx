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
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
              CitaFácil
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-100">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=b6e3f4`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-blue-100"
                />
                <span className="text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 py-2 px-4 bg-white">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2.5 px-3 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full py-2.5 px-3 text-sm text-red-500 hover:bg-red-50 rounded-lg mt-1"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}
