import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Bell, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { to: '/dashboard', label: 'Panel Principal', icon: LayoutDashboard },
    { to: '/appointments', label: 'Mis Citas', icon: Calendar },
    { to: '/new-appointment', label: 'Nueva Cita', icon: PlusCircle },
    { to: '/notifications', label: 'Notificaciones', icon: Bell },
    { to: '/profile', label: 'Mi Perfil', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-72 bg-[#204E59] text-white flex flex-col h-screen sticky top-0 left-0 overflow-hidden shadow-2xl">
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
            onClick={handleLogout}
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
