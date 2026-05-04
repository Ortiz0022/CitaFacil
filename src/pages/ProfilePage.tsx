import { useState } from 'react';
import { User, Mail, Phone, Lock, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function ProfilePage() {
  const { user, updateUser, changePassword } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ name, email, phone });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePassword = async () => {
    setPassError('');
    if (newPass.length < 6) { setPassError('La nueva contraseña debe tener al menos 6 caracteres.'); return; }
    if (newPass !== confirmPass) { setPassError('Las contraseñas no coinciden.'); return; }
    
    setSaving(true);
    try {
      await changePassword(currentPass, newPass);
      setSaving(false);
      setCurrentPass(''); setNewPass(''); setConfirmPass('');
      setPassSaved(true);
      setTimeout(() => setPassSaved(false), 3000);
    } catch (error: any) {
      setSaving(false);
      setPassError(error.message || 'Ocurrió un error al cambiar la contraseña.');
    }
  };
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#204E59] tracking-tighter">Mi Perfil</h1>
          <p className="text-slate-500 mt-2 font-medium">Gestiona tu información y preferencias.</p>
        </div>
        <div className="hidden sm:block">
          <span className="text-[10px] font-black text-[#66B2B2] uppercase tracking-[0.2em] bg-[#95D5D2]/10 px-4 py-2 rounded-full border border-[#95D5D2]/20">
            ID: {user?.id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Avatar section */}
      <Card className="p-10 border-[#95D5D2]/20 bg-gradient-to-br from-white to-[#F4F7F7]">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=95d5d2`}
              alt={name}
              className="w-32 h-32 rounded-[2.5rem] bg-[#95D5D2]/20 shadow-2xl transition-transform group-hover:scale-105 duration-500"
            />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#204E59] rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-center sm:text-left space-y-3">
            <h2 className="text-3xl font-black text-[#204E59] tracking-tight">{user?.name}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <p className="text-slate-500 font-bold">{user?.email}</p>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-xs font-black text-[#66B2B2] uppercase tracking-widest">Paciente Pro</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-10">
        {/* Personal info */}
        <Card className="p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#95D5D2]/20 rounded-2xl flex items-center justify-center text-[#204E59]">
              <User size={24} />
            </div>
            <h3 className="font-black text-2xl text-[#204E59]">Datos Personales</h3>
          </div>
          
          <div className="space-y-6">
            <Input
              label="Nombre completo"
              value={name}
              onChange={e => setName(e.target.value)}
              icon={<User size={18} className="text-[#66B2B2]" />}
              placeholder="Tu nombre"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail size={18} className="text-[#66B2B2]" />}
                placeholder="tu@email.com"
              />
              <Input
                label="Teléfono de contacto"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                icon={<Phone size={18} className="text-[#66B2B2]" />}
                placeholder="+506 8888-0000"
              />
            </div>
          </div>

          {saved && (
            <div className="mt-8 flex items-center gap-3 text-[#204E59] bg-[#95D5D2]/20 rounded-2xl px-6 py-4 text-sm font-black border border-[#95D5D2]/30 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={20} /> ¡Perfil actualizado exitosamente!
            </div>
          )}

          <Button onClick={handleSaveProfile} loading={saving} className="mt-10 h-14 px-10 gap-3">
            <Save size={20} /> Guardar Cambios
          </Button>
        </Card>

        {/* Password */}
        <Card className="p-10 border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#F26C6D]/10 rounded-2xl flex items-center justify-center text-[#F26C6D]">
              <Lock size={24} />
            </div>
            <h3 className="font-black text-2xl text-[#204E59]">Seguridad</h3>
          </div>

          <div className="space-y-6">
            <Input
              label="Contraseña actual"
              type="password"
              value={currentPass}
              onChange={e => {
                setCurrentPass(e.target.value);
                setPassError('');
              }}
              icon={<Lock size={18} className="text-[#66B2B2]" />}
              placeholder="••••••••"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nueva contraseña"
                type="password"
                value={newPass}
                onChange={e => {
                  setNewPass(e.target.value);
                  setPassError('');
                }}
                icon={<Lock size={18} className="text-[#66B2B2]" />}
                placeholder="Mínimo 6 caracteres"
                error={newPass && newPass.length < 6 ? 'Demasiado corta' : ''}
              />
              <Input
                label="Confirmar nueva contraseña"
                type="password"
                value={confirmPass}
                onChange={e => {
                  setConfirmPass(e.target.value);
                  setPassError('');
                }}
                icon={<Lock size={18} className="text-[#66B2B2]" />}
                placeholder="Repite la contraseña"
                error={confirmPass && newPass !== confirmPass ? 'No coinciden' : ''}
              />
            </div>
          </div>

          {passError && (
            <div className="mt-8 text-[#F26C6D] bg-[#F26C6D]/5 border border-[#F26C6D]/20 rounded-2xl px-6 py-4 text-sm font-black">
              {passError}
            </div>
          )}

          {passSaved && (
            <div className="mt-8 flex items-center gap-3 text-[#204E59] bg-[#95D5D2]/20 rounded-2xl px-6 py-4 text-sm font-black border border-[#95D5D2]/30">
              <CheckCircle2 size={20} /> Contraseña actualizada con éxito
            </div>
          )}

          <Button
            onClick={handleSavePassword}
            loading={saving}
            disabled={!currentPass || !newPass || !confirmPass || newPass !== confirmPass || newPass.length < 6}
            variant="primary"
            className="mt-10 h-14 px-10 gap-3 bg-[#635671] hover:bg-[#4D4258]"
          >
            <Lock size={20} /> Actualizar Seguridad
          </Button>
        </Card>
      </div>
    </div>
  );
}
