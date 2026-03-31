'use client';

import TriageFlow from '@/components/triage/TriageFlow';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/50 selection:bg-blue-100">
      {/* Header Estético */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">M</div>
            <span className="text-xl font-black text-slate-900 tracking-tight">MED Express</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 animate-pulse">
              MÉDICOS ONLINE
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section + Triage */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold">
              <span>🚀 MVP v1.0 • Acceso Inmediato</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Consulta médica <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                en minutos, no días.
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Completa el triaje inteligente y conecta con un profesional de la salud. Sin salas de espera, sin complicaciones.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-blue-600 mb-2">⚡</div>
                <h4 className="font-bold text-slate-900">Consulta Express</h4>
                <p className="text-xs text-slate-500 mt-1">Atención en menos de 15 minutos.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-blue-600 mb-2">📄</div>
                <h4 className="font-bold text-slate-900">Receta Digital</h4>
                <p className="text-xs text-slate-500 mt-1">Válida en todas las farmacias.</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative">
              <TriageFlow />
            </div>
          </div>

        </div>
      </div>

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>© 2026 MED Express. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-blue-600 cursor-pointer">Seguridad</span>
            <span className="hover:text-blue-600 cursor-pointer">Privacidad</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
