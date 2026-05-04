import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta. Intenta de nuevo.');
      setLoading(false);
    }
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
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter">Tu carrera médica, <br /><span className="text-[#95D5D2]">evolucionada.</span></h2>
          <p className="text-white/60 text-xl max-w-sm font-medium leading-relaxed">Únete a la red más grande de especialistas y agiliza tu consulta.</p>
        </div>

        <div className="z-10 flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
          <div className="flex -space-x-3">
            {[4, 5, 6, 7].map(i => (
              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=95d5d2`} className="w-10 h-10 rounded-xl border-2 border-[#204E59]" />
            ))}
          </div>
          <p className="text-white text-sm font-bold tracking-tight">Comunidad Global <br /><span className="text-[#95D5D2]">de Especialistas</span></p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 relative">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-5xl font-black text-[#204E59] tracking-tighter">Crear Cuenta</h1>
            <p className="text-slate-400 text-lg font-medium">Comienza tu viaje profesional con nosotros.</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-[#204E59]/10 border border-[#95D5D2]/20 p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nombre completo"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                icon={<User size={20} className="text-[#66B2B2]" />}
                required
              />
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={20} className="text-[#66B2B2]" />}
                required
              />
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  icon={<Lock size={20} className="text-[#66B2B2]" />}
                  required
                />
                <Input
                  label="Repetir Contraseña"
                  type="password"
                  placeholder="Confirma tu clave"
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

              <Button type="submit" loading={loading} className="w-full h-16 text-lg font-black shadow-2xl shadow-[#204E59]/20" size="lg">
                Registrarme Ahora
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 font-medium">
                ¿Ya eres parte?{' '}
                <Link to="/login" className="text-[#204E59] font-black hover:text-[#66B2B2] transition-colors">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
