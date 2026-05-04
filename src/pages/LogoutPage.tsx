import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle2 } from 'lucide-react';
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
      <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-[#95D5D2]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#204E59]">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-black text-[#204E59] mb-2">¡Hasta pronto!</h2>
          <p className="text-slate-500 text-sm mb-1">Has cerrado sesión exitosamente.</p>
          <p className="text-slate-400 text-xs">Redirigiendo al portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-[#F26C6D]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#F26C6D]">
          <LogOut size={40} />
        </div>
        
        <h2 className="text-2xl font-black text-[#204E59] mb-3">Cerrar sesión</h2>
        
        <div className="space-y-1 mb-8">
          <p className="text-slate-600 text-sm font-medium">
            {user?.name ? `Hola ${user.name.split(' ')[0]}, ` : ''}¿Estás seguro de que quieres salir?
          </p>
          <p className="text-slate-400 text-xs">Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.</p>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')} 
            className="flex-1" 
            size="lg"
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleLogout} 
            loading={loading} 
            className="flex-1" 
            size="lg"
          >
            Sí, cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
