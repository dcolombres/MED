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
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Paso 1: Triaje Médico
        </span>
        <span className="text-gray-400 text-xs flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Conexión Segura
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Cómo te sientes hoy?</h2>
      <p className="text-sm text-gray-500 mb-6">Tu descripción ayuda al médico a prepararse antes de la llamada.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            Describe tu síntoma
            <span className="ml-2 group relative">
              <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Sé lo más detallado posible: cuándo empezó, intensidad y localización del dolor.
              </span>
            </span>
          </label>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={4}
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
            placeholder="Ej: Dolor punzante en la sien izquierda desde hace 3 horas..."
            required
          />
        </div>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={requiresCertificate}
              onChange={(e) => setRequiresCertificate(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-semibold text-blue-900">¿Necesitas licencia médica laboral?</span>
          </label>
          
          {requiresCertificate && (
            <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-bold text-blue-700 uppercase mb-1">DNI / Documento de Identidad</label>
                <input
                  type="text"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  className="block w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Número de documento"
                  required={requiresCertificate}
                />
              </div>
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[11px] text-blue-700 leading-tight">
                  Este dato es **estrictamente confidencial** y solo se utiliza para validar legalmente tu certificado médico.
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all transform active:scale-[0.98] disabled:bg-gray-400"
        >
          {loading ? 'Preparando consulta...' : 'Continuar al Paso 2'}
        </button>
        
        <p className="text-center text-[10px] text-gray-400">
          Al continuar, aceptas que tus datos sean tratados bajo normas de ética médica internacional (HIPAA/GDPR).
        </p>
      </form>
    </div>
  );
}
