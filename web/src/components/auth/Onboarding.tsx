'use client';

import { useState } from 'react';
import { requestMagicLink } from '@/lib/api';

export default function Onboarding() {
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
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Enlace enviado!</h2>
        <p className="text-gray-600 mb-6">Hemos enviado un acceso directo a **{email}**.</p>
        
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-left mb-6">
          <h4 className="text-xs font-bold text-yellow-800 uppercase mb-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            ¿No lo encuentras?
          </h4>
          <p className="text-[11px] text-yellow-700 leading-tight">
            Revisa tu carpeta de **Spam** o **Promociones**. El enlace es válido por 15 minutos.
          </p>
        </div>

        {process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && (
          <div className="mt-4 p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30">
            <p className="text-xs text-blue-800 font-medium mb-3">Escritorio del Cliente (Demo):</p>
            <button
              onClick={() => window.location.href = `/MED/auth/verify?token=mock-token`}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm"
            >
              Simular Click en Email 🖱️
            </button>
            <p className="text-[10px] text-blue-500 mt-2 italic">
              Este botón solo aparece en modo demo para facilitar la navegación del cliente.
            </p>
          </div>
        )}


        <button 
          onClick={() => setSent(false)}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Usar otro correo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Paso 2: Identificación
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu acceso sin contraseñas</h2>
      <p className="text-sm text-gray-500 mb-8">Te enviaremos un **Enlace Mágico** a tu correo para que entres de forma segura y rápida.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tu mejor email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50/30 transition-all"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all transform active:scale-[0.98] disabled:bg-gray-400"
        >
          {loading ? 'Generando enlace...' : 'Recibir Enlace de Acceso'}
        </button>

        <div className="flex items-center justify-center space-x-4 grayscale opacity-50">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
        </div>
      </form>
    </div>
  );
}
