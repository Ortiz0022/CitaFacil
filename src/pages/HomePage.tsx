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
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="glass-morphism rounded-2xl px-6 h-16 flex items-center justify-between shadow-lg shadow-slate-200/50">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Calendar size={20} className="text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                Cita<span className="text-blue-600">Fácil</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
              {['Características', 'Especialidades', 'Cómo funciona'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-semibold">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="font-semibold px-5">Empezar ahora</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                Nueva experiencia en salud digital
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Gestiona tu salud con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">inteligencia</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                CitaFácil es la plataforma líder que conecta pacientes con los mejores especialistas. Agenda en segundos, sin esperas ni complicaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg gap-2">
                    Reservar mi primera cita <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-200">
                    Ver especialistas
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} 
                      alt="User"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={14} fill="currentColor" />
                    <span>4.9/5</span>
                  </div>
                  <p className="text-slate-500">Más de 10,000 pacientes confían en nosotros</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-200 border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Medical Professional" 
                  className="w-full h-auto"
                />
              </div>
              {/* Floating UI Elements */}
              <div className="absolute -bottom-6 -left-6 glass-morphism p-6 rounded-2xl shadow-xl z-20 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Cita Confirmada</p>
                    <p className="text-xs text-slate-500">Dra. Ana Martínez - 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Diseñado para la excelencia</h2>
            <p className="text-lg text-slate-600">Combinamos tecnología de vanguardia con un enfoque humano para ofrecerte la mejor experiencia de usuario.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon size={28} className="text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties - Horizontal Scroll or Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestras Especialidades</h2>
              <p className="text-slate-600">Contamos con una red global de especialistas certificados.</p>
            </div>
            <Button variant="outline" className="h-12">Ver todas las especialidades</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map(s => (
              <div key={s} className="p-6 bg-white border border-slate-100 rounded-2xl text-center hover:border-blue-600 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-slate-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-50">
                  <Calendar size={20} className="text-slate-400 group-hover:text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[40px] overflow-hidden bg-slate-900 p-12 md:p-24 text-center">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Empieza a cuidar de ti hoy mismo</h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">Únete a los miles de usuarios que ya han simplificado su vida con CitaFácil.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button className="h-16 px-10 text-lg bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto" size="lg">
                    Crear mi cuenta gratuita
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="h-16 px-10 text-lg border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" size="lg">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <span className="font-bold text-xl text-slate-900">CitaFácil</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-6">Simplificando el acceso a la salud mediante tecnología intuitiva y procesos eficientes.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Producto</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Especialistas</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Compañía</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 CitaFácil. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
