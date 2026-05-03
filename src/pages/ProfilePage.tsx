import { useState } from 'react';
import { User, Mail, Phone, Lock, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
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
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi Perfil</h1>
        <p className="text-slate-500 text-sm mt-1">Gestiona tu información personal</p>
      </div>

      {/* Avatar section */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4`}
            alt={name}
            className="w-20 h-20 rounded-2xl bg-blue-100"
          />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              <User size={10} /> Paciente
            </span>
          </div>
        </div>
      </Card>

      {/* Personal info */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Información personal</h3>
        <div className="space-y-4">
          <Input
            label="Nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            icon={<User size={16} />}
            placeholder="Tu nombre"
          />
          <Input
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            placeholder="tu@email.com"
          />
          <Input
            label="Teléfono"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            icon={<Phone size={16} />}
            placeholder="+506 8888-0000"
          />
        </div>

        {saved && (
          <div className="flex items-center gap-2 mt-4 text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5 text-sm">
            <CheckCircle2 size={16} /> Perfil actualizado exitosamente
          </div>
        )}

        <Button onClick={handleSaveProfile} loading={saving} className="mt-4 gap-2">
          <Save size={14} /> Guardar cambios
        </Button>
      </Card>

      {/* Password */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Cambiar contraseña</h3>
        <div className="space-y-4">
          <Input
            label="Contraseña actual"
            type="password"
            value={currentPass}
            onChange={e => setCurrentPass(e.target.value)}
            icon={<Lock size={16} />}
            placeholder="••••••••"
          />
          <Input
            label="Nueva contraseña"
            type="password"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            icon={<Lock size={16} />}
            placeholder="Mínimo 6 caracteres"
          />
          <Input
            label="Confirmar nueva contraseña"
            type="password"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
            icon={<Lock size={16} />}
            placeholder="Repite la contraseña"
            error={passError}
          />
        </div>

        {passSaved && (
          <div className="flex items-center gap-2 mt-4 text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5 text-sm">
            <CheckCircle2 size={16} /> Contraseña actualizada exitosamente
          </div>
        )}

        <Button
          onClick={handleSavePassword}
          loading={saving}
          disabled={!currentPass || !newPass || !confirmPass}
          variant="outline"
          className="mt-4 gap-2"
        >
          <Lock size={14} /> Actualizar contraseña
        </Button>
      </Card>
    </div>
  );
}
