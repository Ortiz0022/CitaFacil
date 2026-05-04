import { Link } from 'react-router-dom';
import { Calendar, Shield, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function HomePage() {
  const features = [
    { icon: Calendar, title: 'Agenda Inteligente', desc: 'Visualiza y gestiona tus citas en un solo lugar.' },
    { icon: Clock, title: 'Disponibilidad en Tiempo Real', desc: 'Consulta los horarios disponibles al instante.' },
    { icon: Shield, title: 'Datos Seguros', desc: 'Tu información médica siempre protegida.' },
    { icon: Star, title: 'Profesionales Calificados', desc: 'Red de especialistas verificados y valorados.' },
  ];

  const specialties = ['Medicina General', 'Cardiología', 'Dermatología', 'Ortopedia', 'Pediatría', 'Psicología'];

  return (
    <div className="min-h-screen bg-white selection:bg-teal-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="glass-morphism rounded-2xl px-6 h-16 flex items-center justify-between shadow-lg shadow-teal-900/5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                <Calendar size={20} className="text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Cita<span className="text-teal-600">Fácil</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
              {['Características', 'Especialidades', 'Cómo funciona'].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-bold">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="font-bold px-6 shadow-md shadow-teal-100">Empezar</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold animate-fade-in uppercase tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
                Nueva experiencia en salud digital
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Gestiona tu salud con <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">precisión</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                CitaFácil es la plataforma líder que conecta pacientes con los mejores especialistas. Agenda en segundos, con una interfaz profesional diseñada para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold gap-3 shadow-xl shadow-teal-200">
                    Reservar Cita <ArrowRight size={22} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold border-slate-200 text-slate-600">
                    Ver Especialistas
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      className="w-12 h-12 rounded-2xl border-4 border-white shadow-sm object-cover" 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}&backgroundColor=2dd4bf`} 
                      alt="User"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-teal-600 font-black">
                    <Star size={16} fill="currentColor" />
                    <span className="text-lg">4.9/5</span>
                  </div>
                  <p className="text-slate-400 font-medium">Confianza total de nuestra comunidad</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-200 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Medical Professional" 
                  className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-700"
                />
              </div>
              {/* Floating UI Elements */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-teal-900/10 z-20 border border-teal-50 animate-bounce-slow">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-tight">Cita Confirmada</p>
                    <p className="text-sm font-bold text-teal-600">Dra. Ana Martínez</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Diseñado para la excelencia</h2>
            <p className="text-xl text-slate-500 font-medium">Combinamos tecnología de vanguardia con un enfoque humano para ofrecerte la mejor experiencia de usuario.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-10 rounded-[2rem] border border-transparent shadow-sm hover:shadow-2xl hover:border-teal-100 hover:-translate-y-3 transition-all duration-500 group">
                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  <Icon size={32} className="text-teal-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Especialidades</h2>
              <p className="text-xl text-slate-500 font-medium">Contamos con una red global de especialistas certificados.</p>
            </div>
            <Button variant="outline" className="h-14 px-8 font-bold text-teal-600 border-teal-100 bg-teal-50 hover:bg-teal-100">Ver todas</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map(s => (
              <div key={s} className="p-8 bg-white border border-slate-100 rounded-3xl text-center hover:border-teal-600 hover:shadow-2xl hover:shadow-teal-100/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-teal-50 group-hover:scale-110 transition-all">
                  <Calendar size={24} className="text-slate-400 group-hover:text-teal-600" />
                </div>
                <span className="text-base font-bold text-slate-700 group-hover:text-teal-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-16 md:p-32 text-center shadow-2xl shadow-teal-900/20">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-600/30 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-none">Tu salud merece lo mejor.</h2>
              <p className="text-2xl text-slate-400 mb-12 leading-relaxed font-medium">Únete a la comunidad que está transformando el acceso médico.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/register">
                  <Button className="h-20 px-12 text-xl font-black bg-teal-500 text-white hover:bg-teal-600 hover:scale-105 transition-all w-full sm:w-auto shadow-2xl shadow-teal-900/50" size="lg">
                    Registrarme Gratis
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="h-20 px-12 text-xl font-bold border-white/20 text-white hover:bg-white/10 w-full sm:w-auto" size="lg">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
                  <Calendar size={24} className="text-white" />
                </div>
                <span className="font-black text-3xl text-slate-900 tracking-tighter">CitaFácil</span>
              </div>
              <p className="text-xl text-slate-500 max-w-sm mb-8 font-medium">Simplificando el acceso a la salud mediante tecnología intuitiva y procesos eficientes.</p>
            </div>
            <div>
              <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-sm">Producto</h4>
              <ul className="space-y-5 text-lg text-slate-500 font-medium">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Especialistas</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-sm">Compañía</h4>
              <ul className="space-y-5 text-lg text-slate-500 font-medium">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-base text-slate-400 font-medium">
            <p>© 2026 CitaFácil. Todos los derechos reservados.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-teal-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-teal-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
