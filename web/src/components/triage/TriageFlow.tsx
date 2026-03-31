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
      <div className="animate-premium">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="text-left py-4">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">01</div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Symptom Analysis</h2>
      </div>

      <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic leading-none">Tell us how you feel.</h3>
      <p className="text-slate-400 text-sm mb-12 font-medium">Be as detailed as possible. Our AI-driven triage will route you to the best specialist.</p>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative">
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={4}
            className="block w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-brand-primary outline-none transition-all resize-none text-xl font-medium"
            placeholder="e.g. Sharp pain in my left temple since 3 hours ago..."
            required
          />
        </div>

        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:bg-white transition-colors duration-500">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={requiresCertificate}
              onChange={(e) => setRequiresCertificate(e.target.checked)}
              className="w-6 h-6 text-brand-primary border-slate-200 rounded-xl focus:ring-brand-primary transition-all"
            />
            <span className="ml-4 text-sm font-black text-slate-900 uppercase tracking-widest">
              I need a medical certificate
            </span>
          </label>
          
          {requiresCertificate && (
            <div className="mt-8 pt-8 border-t border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">Identity Document Number</label>
              <input
                type="text"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                className="block w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-900 font-bold focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none"
                placeholder="Passport / ID Number"
                required={requiresCertificate}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-brand-primary hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-500 active:scale-95 disabled:bg-slate-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing...
            </span>
          ) : (
            'Continue to Identity Verification →'
          )}
        </button>
      </form>
    </div>
  );
}
