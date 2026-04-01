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
    return <Onboarding />;
  }

  return (
    <div className="max-w-md mx-auto p-8 glass-panel rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/20">
          Paso 1: Triaje
        </span>
        <span className="text-blue-200/50 text-xs flex items-center font-medium">
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Conexión Segura
        </span>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2 relative z-10">¿Cómo te sientes hoy?</h2>
      <p className="text-sm text-blue-100/60 mb-8 font-light relative z-10">Tu descripción ayuda al médico a prepararse antes de la videollamada.</p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-semibold text-blue-100 mb-3 flex items-center">
            Describe tu síntoma
            <span className="ml-2 group relative">
              <svg className="w-4 h-4 text-blue-300/50 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-blue-900/90 text-blue-50 text-[11px] font-light rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 backdrop-blur-md border border-blue-500/20">
                Sé lo más detallado posible: cuándo empezó, intensidad y localización del dolor.
              </span>
            </span>
          </label>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={4}
            className="block w-full px-5 py-4 rounded-2xl glass-input tracking-wide"
            placeholder="Ej: Dolor punzante en la sien izquierda desde hace 3 horas..."
            required
          />
        </div>

        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.05] transition-all">
          <label className="flex items-center cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={requiresCertificate}
                onChange={(e) => setRequiresCertificate(e.target.checked)}
                className="w-5 h-5 opacity-0 absolute cursor-pointer peer"
              />
              <div className="w-5 h-5 rounded-[6px] border border-blue-400/30 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center">
                <svg className={`w-3 h-3 text-white transition-opacity ${requiresCertificate ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="ml-3 text-sm font-medium text-blue-50 group-hover:text-white transition-colors">¿Necesitás licencia médica laboral?</span>
          </label>
          
          {requiresCertificate && (
            <div className="mt-5 space-y-4 animate-fade-in-up">
              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase mb-2 tracking-wider">DNI / Documento</label>
                <input
                  type="text"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl glass-input"
                  placeholder="Número de documento"
                  required={requiresCertificate}
                />
              </div>
              <div className="flex items-start space-x-2 bg-blue-500/10 p-3 rounded-lg border border-blue-500/10">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[11px] text-blue-200/80 leading-relaxed font-light">
                  Este dato es <strong className="font-semibold text-blue-200">estrictamente confidencial</strong> y se utiliza para validar legalmente el documento.
                </p>
              </div>
            </div>
          )}
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
          ) : 'Continuar al Paso 2'}
        </button>
        
        <p className="text-center text-[10px] text-blue-200/40 font-light px-4">
          Al continuar, aceptas que tus datos sean tratados bajo normas de ética médica internacional.
        </p>
      </form>
    </div>
  );
}
