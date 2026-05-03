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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left Side - Visual */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        
        <Link to="/" className="inline-flex items-center gap-2 z-10">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">CitaFácil</span>
        </Link>

        <div className="z-10">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Empieza hoy mismo tu camino hacia una mejor salud.</h2>
          <p className="text-blue-100 text-lg max-w-md">Crea tu cuenta en menos de un minuto y accede a los mejores especialistas de la región.</p>
        </div>

        <div className="z-10 flex items-center gap-4 text-blue-100 text-sm">
          <div className="flex -space-x-2">
            {[4, 5, 6].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-400" />
            ))}
          </div>
          <span>Únete a nuestra comunidad</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Crea tu cuenta</h1>
            <p className="text-slate-500 mt-2">Completa tus datos para empezar a agendar tus citas.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                placeholder="Juan García"
                value={name}
                onChange={e => setName(e.target.value)}
                icon={<User size={18} />}
                required
              />
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={18} />}
                required
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                required
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                icon={<Lock size={18} />}
                required
              />

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {error}
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full h-14 text-base font-bold shadow-lg shadow-blue-200 mt-4" size="lg">
                Crear cuenta
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors underline-offset-4 hover:underline">
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
