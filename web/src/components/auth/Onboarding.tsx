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
      <div className="text-center p-8 glass-panel rounded-3xl max-w-md mx-auto relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-[50px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">¡Enlace enviado!</h2>
          <p className="text-blue-100/70 mb-8 font-light text-lg">Hemos enviado un acceso directo a <br/><strong className="font-medium text-white">{email}</strong></p>
          
          <div className="bg-yellow-500/10 p-5 rounded-2xl border border-yellow-500/20 text-left mb-8 backdrop-blur-sm">
            <h4 className="text-xs font-bold text-yellow-300 uppercase mb-2 flex items-center tracking-wider">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              ¿No lo encontrás?
            </h4>
            <p className="text-xs text-yellow-100/70 leading-relaxed font-light">
              Revisá tu carpeta de <strong className="text-yellow-100 font-medium">Spam</strong> o <strong className="text-yellow-100 font-medium">Promociones</strong>. El enlace es válido por 15 minutos.
            </p>
          </div>

          {process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && (
            <div className="mt-6 p-5 border border-dashed border-purple-500/30 rounded-2xl bg-purple-500/5 backdrop-blur-sm">
              <p className="text-xs text-purple-300 font-bold mb-4 uppercase tracking-wider">Escritorio Demo</p>
              <button
                onClick={() => router.push(`/auth/verify?token=mock-token`)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-900/40"
              >
                Simular Click en Email 🖱️
              </button>
            </div>
          )}

          <button 
            onClick={() => setSent(false)}
            className="mt-8 text-blue-300/60 text-sm font-medium hover:text-white hover:underline transition-colors"
          >
            Usar otro correo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 glass-panel rounded-3xl relative overflow-hidden animate-fade-in-up">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>

      <div className="flex items-center space-x-2 mb-8 relative z-10">
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-purple-400/20">
          Paso 2: Identificación
        </span>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Acceso Inmediato</h2>
      <p className="text-sm text-blue-100/60 mb-8 font-light relative z-10">Te enviaremos un <strong className="font-semibold text-blue-200">Enlace Mágico</strong> a tu correo para que entres de forma segura y rápida.</p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-3">Tu mejor email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-5 py-4 rounded-2xl glass-input tracking-wide"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-button py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Recibir Enlace Seguro'}
        </button>

        <div className="flex items-center justify-center space-x-4 opacity-40 mix-blend-screen transition-opacity hover:opacity-100 pt-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5 brightness-0 invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 brightness-0 invert" />
        </div>
      </form>
    </div>
  );
}
