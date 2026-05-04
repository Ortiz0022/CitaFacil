import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Calendar, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('juan.garcia@email.com');
  const [password, setPassword] = useState('demo1234');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Credenciales incorrectas. Intenta de nuevo.');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F7] flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Visual */}
      <div className="hidden md:flex md:w-[45%] bg-[#204E59] p-16 flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#95D5D2]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF9E7D]/10 rounded-full blur-[80px]" />

        <Link to="/" className="inline-flex items-center gap-3 z-10 group">
          <div className="w-12 h-12 bg-[#95D5D2] rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Calendar size={24} className="text-[#204E59]" />
          </div>
          <span className="text-3xl font-black text-white tracking-tighter">CitaFácil</span>
        </Link>

        <div className="z-10 space-y-6">
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter">Gestiona tu salud, <br /><span className="text-[#95D5D2]">sin esperas.</span></h2>
          <p className="text-white/60 text-xl max-w-sm font-medium leading-relaxed">Únete a la plataforma más moderna de gestión médica profesional.</p>
        </div>

        <div className="z-10 flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=95d5d2`} className="w-10 h-10 rounded-xl border-2 border-[#204E59]" />
            ))}
          </div>
          <p className="text-white text-sm font-bold tracking-tight">Más de 10k usuarios <br /><span className="text-[#95D5D2]">confían en nosotros</span></p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 relative">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-5xl font-black text-[#204E59] tracking-tighter">Bienvenido</h1>
            <p className="text-slate-400 text-lg font-medium">Accede a tu panel administrativo.</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-[#204E59]/10 border border-[#95D5D2]/20 p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={20} className="text-[#66B2B2]" />}
                required
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-black uppercase tracking-widest text-[#204E59]/60">Contraseña</label>
                  <Link to="/forgot-password" underline="none" className="text-xs font-black text-[#66B2B2] hover:text-[#F26C6D] transition-colors">
                    ¿Olvidaste la clave?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#66B2B2] group-focus-within:text-[#204E59] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full rounded-[1.5rem] border border-slate-100 bg-[#F4F7F7] pl-14 pr-12 py-4 text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-[#95D5D2]/20 focus:border-[#95D5D2] focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#66B2B2] hover:text-[#204E59] transition-colors"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-[#F26C6D]/5 border border-[#F26C6D]/10 text-[#F26C6D] text-xs font-black rounded-2xl px-6 py-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F26C6D]" />
                  {error}
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full h-16 text-lg font-black shadow-2xl shadow-[#204E59]/20" size="lg">
                Ingresar al Portal
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 font-medium">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-[#204E59] font-black hover:text-[#66B2B2] transition-colors">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

