import TriageFlow from '@/components/triage/TriageFlow';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10 animate-fade-in-up">
        <div className="inline-block mb-5 px-4 py-1.5 rounded-full glass-panel border-blue-400/20">
          <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">Atención Médica Digital</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-sm">
            ME-DIC
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-lg tracking-wide text-blue-100/70 font-light leading-relaxed">
          Tu salud no espera. Completá el triaje y conectate con un especialista de inmediato.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md drop-shadow-2xl">
        <TriageFlow />
      </div>

      <footer className="mt-20 text-blue-200/40 text-xs tracking-widest uppercase relative z-10">
        &copy; {new Date().getFullYear()} ME-DIC. Todos los derechos reservados.
      </footer>
    </main>
  );
}
