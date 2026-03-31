'use client';

import { useState } from 'react';
import { createTriage } from '@/lib/api';
import Onboarding from '../auth/Onboarding';

export default function TriageFlow() {
  const [symptom, setSymptom] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [requiresCertificate, setRequiresCertificate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTriage({ description: symptom }, identityNumber, requiresCertificate);
      setStep(2);
    } catch (error: any) {
      console.error('Triage submission error:', error);
      alert(`Error al conectar con la API: ${error.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="animate-fade-in">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">1</span>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Triaje Inicial</h2>
        </div>
      </div>

      <h3 className="text-3xl font-black text-slate-900 mb-4">¿Cómo te sientes hoy?</h3>
      <p className="text-slate-500 mb-8 leading-relaxed">Describe tus síntomas para que nuestro médico de guardia pueda prepararse.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center">
            Describe tu malestar
            <span className="ml-2 text-blue-500">✨</span>
          </label>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={5}
            className="block w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:shadow-inner transition-all resize-none"
            placeholder="Ej: Siento un dolor punzante en la frente que empeora con la luz..."
            required
          />
        </div>

        <div className="p-6 bg-blue-50/40 rounded-3xl border border-blue-100/50">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={requiresCertificate}
              onChange={(e) => setRequiresCertificate(e.target.checked)}
              className="w-6 h-6 text-blue-600 border-slate-200 rounded-lg focus:ring-blue-500 transition-all"
            />
            <span className="ml-4 text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
              Necesito licencia médica laboral
            </span>
          </label>
          
          {requiresCertificate && (
            <div className="mt-6 pt-6 border-t border-blue-100/50 animate-in fade-in slide-in-from-top-2">
              <label className="block text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">Identificación Oficial</label>
              <input
                type="text"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                className="block w-full px-5 py-3 bg-white border border-blue-200 rounded-xl text-slate-900 focus:border-blue-500 shadow-sm"
                placeholder="Número de DNI / Pasaporte"
                required={requiresCertificate}
              />
              <p className="text-[10px] text-blue-400 mt-3 font-medium">
                🔒 Encriptado y cumpliendo normativas de protección de datos.
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 transition-all group-hover:scale-105"></div>
          <div className="relative py-5 px-6 flex items-center justify-center space-x-3 text-white font-black text-lg">
            <span>{loading ? 'Procesando...' : 'Siguiente Paso'}</span>
            {!loading && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
          </div>
        </button>
      </form>
    </div>
  );
}
