'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestMagicLink } from '@/lib/api';

export default function Onboarding() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestMagicLink(email);
      setSent(true);
    } catch (error) {
      console.error(error);
      alert('Error al enviar el enlace de acceso');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-xl mx-auto text-center animate-fade-in">
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] transform rotate-12">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">¡Correo enviado!</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Hemos enviado un enlace de acceso seguro a <br/>
          <strong className="text-blue-600 font-bold">{email}</strong>
        </p>
        
        {process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && (
          <div className="mb-10 p-8 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 relative">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Demo Tool
            </div>
            <p className="text-xs text-slate-400 mb-6 font-medium italic">Simula la apertura del correo desde el dispositivo del paciente:</p>
            <button
              onClick={() => router.push('/auth/verify?token=mock-token')}
              className="w-full bg-white text-blue-600 border-2 border-blue-600 py-4 px-6 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-100"
            >
              Abrir Enlace Mágico 🖱️
            </button>
          </div>
        )}

        <button 
          onClick={() => setSent(false)}
          className="text-slate-400 text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest"
        >
          ← Usar otro correo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-xl mx-auto">
      <div className="flex items-center space-x-2 mb-8">
        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">2</span>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Identificación</h2>
      </div>

      <h3 className="text-3xl font-black text-slate-900 mb-4">Acceso sin claves</h3>
      <p className="text-slate-500 mb-10 leading-relaxed">Tu seguridad es prioridad. Te enviaremos un enlace de un solo uso para autenticarte.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Tu correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-inner"
            placeholder="nombre@ejemplo.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 transition-all group-hover:scale-105"></div>
          <div className="relative py-5 px-6 flex items-center justify-center space-x-3 text-white font-black text-lg">
            <span>{loading ? 'Enviando...' : 'Obtener Enlace de Acceso'}</span>
            {!loading && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
          </div>
        </button>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Pasarelas de Pago Seguras</p>
          <div className="flex items-center space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>
      </form>
    </div>
  );
}
