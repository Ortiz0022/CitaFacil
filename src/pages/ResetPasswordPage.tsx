import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    
    try {
      const ok = await resetPassword(email, password);
      if (ok) {
        setSuccess(true);
      } else {
        setError('No se pudo encontrar el usuario para restablecer la clave.');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar cambiar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F4F7F7] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-[#95D5D2]/30 p-12 text-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-[#95D5D2]/20 rounded-[2.5rem] flex items-center justify-center mx-auto text-[#204E59]">
            <CheckCircle2 size={56} />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-[#204E59]">¡Clave actualizada!</h1>
            <p className="text-slate-500 font-medium">Tu contraseña ha sido restablecida con éxito. Ya puedes iniciar sesión.</p>
          </div>
          <Button onClick={() => navigate('/login')} className="w-full h-16 text-lg font-black rounded-2xl">
            Ir al Inicio de Sesión <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F7] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-[#204E59] tracking-tighter">Nueva contraseña</h1>
          <p className="text-slate-500 font-medium">Estás restableciendo la cuenta de <span className="text-[#66B2B2] font-bold">{email}</span></p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-[#204E59]/10 border border-[#95D5D2]/20 p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  label="Nueva Contraseña"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  icon={<Lock size={20} className="text-[#66B2B2]" />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-[3.2rem] text-[#66B2B2] hover:text-[#204E59] transition-colors"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Input
                label="Confirmar Contraseña"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                icon={<Lock size={20} className="text-[#66B2B2]" />}
                required
              />
            </div>

            {error && (
              <div className="bg-[#F26C6D]/5 border border-[#F26C6D]/10 text-[#F26C6D] text-xs font-black rounded-2xl px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F26C6D]" />
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full h-16 text-lg font-black shadow-xl" size="lg">
              Actualizar Contraseña
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
