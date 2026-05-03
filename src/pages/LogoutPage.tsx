import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function LogoutPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    logout();
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={28} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">¡Hasta pronto!</h2>
          <p className="text-slate-500 text-sm">Has cerrado sesión exitosamente. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Cerrar sesión</h2>
          <p className="text-slate-500 text-sm mb-2">
            {user?.name ? `Hola ${user.name.split(' ')[0]}, ` : ''}¿Estás seguro de que quieres salir?
          </p>
          <p className="text-slate-400 text-xs mb-6">Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.</p>

          <div className="flex flex-col gap-3">
            <Button variant="danger" onClick={handleLogout} loading={loading} className="w-full" size="lg">
              Sí, cerrar sesión
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full" size="lg">
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
