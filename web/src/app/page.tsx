'use client';

import TriageFlow from '@/components/triage/TriageFlow';

export default function Home() {
  return (
    <main className="min-h-screen bg-mesh font-sans selection:bg-brand-primary/10">
      
      {/* Floating Glass Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl glass rounded-3xl z-50 px-8 py-5 flex items-center justify-between shadow-premium border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">MED <span className="text-brand-primary">EXPRESS</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Network Active</span>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
            Admin Portal
          </button>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Intro Badge */}
        <div className="animate-premium opacity-0 [animation-delay:0.1s]">
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-2xl text-[11px] font-black text-brand-primary uppercase tracking-[0.2em] border border-brand-primary/20 shadow-sm mb-10">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Healthcare Redefined
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10 animate-premium opacity-0 [animation-delay:0.2s]">
          Better care, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-cyan-400">anywhere.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-16 animate-premium opacity-0 [animation-delay:0.3s]">
          Seamless medical consultation powered by intelligence. Start your triage in seconds and skip the waiting room forever.
        </p>

        {/* Triage Container with Premium Styling */}
        <div className="w-full max-w-2xl animate-premium opacity-0 [animation-delay:0.4s] relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/10 to-cyan-400/10 rounded-[4rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div className="relative glass rounded-[3rem] p-4 md:p-8 shadow-2xl border border-white/40 ring-1 ring-black/[0.05]">
             <TriageFlow />
          </div>
        </div>

        {/* Trusted By / Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 animate-premium opacity-0 [animation-delay:0.6s]">
          {[
            { label: 'Instant Connect', val: '15m', desc: 'Average Wait' },
            { label: 'Certified Doctors', val: '500+', desc: 'Specialists' },
            { label: 'Pharmacy Network', val: '10k+', desc: 'Integrations' },
            { label: 'Privacy Standards', val: 'AES', desc: '256-bit Encrypted' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-brand-primary transition-colors">{stat.label}</div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
              <div className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-16 border-t border-slate-100 bg-white px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <p>© 2026 MED EXPRESS INTERNATIONAL • PRIVACY DRIVEN MEDICINE</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="hover:text-brand-primary cursor-pointer transition-colors">HIPAA Compliance</span>
            <span className="hover:text-brand-primary cursor-pointer transition-colors">GDPR Standards</span>
            <span className="hover:text-brand-primary cursor-pointer transition-colors">Licensing</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
