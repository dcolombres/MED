'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [consultationId, setConsultationId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(storedUser));
    setConsultationId(`CONS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white py-12 px-6 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-xl w-full text-center">
        
        {/* Icono de Éxito Premium */}
        <div className="mb-12 relative inline-flex">
          <div className="absolute inset-0 bg-green-200 blur-2xl opacity-40 rounded-full"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-green-200 transform -rotate-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter italic">¡Todo listo!</h1>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed">
          Tu consulta ha sido procesada con éxito. Un médico te atenderá en la sala de espera virtual.
        </p>

        {/* Tarjeta de Detalles */}
        <div className="bg-slate-50 rounded-[2rem] p-8 mb-12 border border-slate-100 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 blur-3xl rounded-full -mr-12 -mt-12"></div>
          
          <div className="space-y-4 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">ID de Consulta</span>
              <span className="text-sm font-mono font-bold text-blue-600 bg-white px-3 py-1 rounded-lg border border-slate-200">{consultationId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Paciente</span>
              <span className="text-sm font-bold text-slate-700">{user.email}</span>
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado</span>
              <span className="flex items-center text-sm font-black text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                SALA DE ESPERA ACTIVA
              </span>
            </div>
          </div>
        </div>

        {/* Acciones Finales */}
        <div className="grid gap-4">
          <button
            onClick={() => alert('Conectando con el médico...')}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
          >
            Entrar a Videollamada →
          </button>
          
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 text-xs text-blue-700 font-medium leading-relaxed">
            📢 Recibirás una notificación en tu correo cuando el médico esté listo para la descarga de tu **Certificado Médico Digital**.
          </div>

          <button
            onClick={() => router.push('/')}
            className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors py-4"
          >
            Volver al Inicio
          </button>
        </div>

      </div>
    </main>
  );
}
