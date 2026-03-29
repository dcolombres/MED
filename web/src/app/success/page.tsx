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
    // Generar un ID de consulta ficticio para el MVP
    setConsultationId(`CONS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">¡Pago Confirmado!</h1>
        <p className="text-gray-600 mb-8">Tu consulta ha sido programada con éxito.</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">ID de Consulta</span>
            <span className="text-sm font-mono font-bold text-blue-700">{consultationId}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-500">Paciente</span>
            <span className="text-sm font-semibold text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Estado</span>
            <span className="text-sm font-bold text-green-600">Listo para Ingresar</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => alert('Abriendo Sala de Espera Virtual...')}
            className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-200"
          >
            Entrar a la Videollamada
          </button>
          
          <p className="text-xs text-gray-400 px-4">
            * Al finalizar la llamada, podrás descargar tu **Certificado de Licencia Médica (UC-06)** directamente desde esta plataforma.
          </p>
          
          <button
            onClick={() => router.push('/')}
            className="w-full text-gray-500 py-2 font-medium hover:text-gray-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
