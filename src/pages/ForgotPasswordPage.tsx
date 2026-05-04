import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import emailjs from '@emailjs/browser';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const resetLink = `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}`;

      const templateParams = {
        email: email, // Coincide con {{email}} en tu template
        link: resetLink, // Coincide con {{link}} en tu template
        user_name: email.split('@')[0],
      };

      // CONFIGURACIÓN DE EMAILJS:
      // He puesto tus IDs de las capturas. 
      // Solo falta tu PUBLIC_KEY (la encuentras en EmailJS -> Account -> Public Key)

      await emailjs.send(
        'service_b9g67z7',
        'template_uavg1he',
        templateParams,
        'sWAis4nOO0DyfBcXQ' // <--- DEBES PEGAR TU PUBLIC KEY AQUÍ
      );

      setLoading(false);
      setSent(true);
    } catch (err: any) {
      console.error('Error enviando email:', err);
      setError('No pudimos enviar el correo. Por favor intenta más tarde.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F7] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-[#66B2B2] font-bold hover:text-[#204E59] mb-6 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver al portal
          </Link>
          <h1 className="text-4xl font-black text-[#204E59] tracking-tighter">Recuperar cuenta</h1>
          <p className="text-slate-500 mt-3 font-medium">Enviaremos un código de seguridad a tu correo.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#204E59]/10 border border-[#95D5D2]/30 p-10">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Tu correo electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={18} className="text-[#66B2B2]" />}
                required
              />

              {error && (
                <p className="text-xs font-bold text-[#F26C6D] bg-[#F26C6D]/5 p-3 rounded-xl border border-[#F26C6D]/10">
                  {error}
                </p>
              )}

              <Button type="submit" loading={loading} className="w-full h-16 text-base font-black shadow-xl" size="lg">
                Enviar código <Send size={18} />
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4 animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-[#95D5D2]/20 rounded-[2rem] flex items-center justify-center mx-auto text-[#204E59]">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#204E59]">¡Correo enviado!</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Revisa tu bandeja de entrada en <br />
                  <span className="text-[#66B2B2] font-bold">{email}</span>
                </p>
              </div>
              <Link to="/login">
                <Button variant="outline" className="w-full h-14 mt-4 rounded-2xl">
                  Ir al portal principal
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
