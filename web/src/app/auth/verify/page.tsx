'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    if (!token) {
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
      if (IS_DEMO && token === 'mock-token') {
        console.log('DEMO MODE: Verificando token mock');
        localStorage.setItem('accessToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({ email: 'paciente@ejemplo.com', name: 'Paciente Demo' }));
        setStatus('success');
        setTimeout(() => router.push('/checkout'), 2000);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify?token=${token}`);

        if (!response.ok) throw new Error('Token inválido o expirado');
        
        const data = await response.json();
        
        // Guardar sesión (KISS: localStorage para el MVP)
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        setStatus('success');
        
        // Redirigir al Paso 3 (Pagos) tras 2 segundos
        setTimeout(() => {
          router.push('/checkout');
        }, 2000);
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center glass-panel rounded-3xl max-w-sm w-full animate-fade-in-up">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 animate-pulse"></div>
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-r-2 border-blue-400 relative z-10"></div>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Verificando Acceso</h2>
        <p className="text-blue-200/60 mt-3 font-light">Asegurando tu conexión médica...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center glass-panel border-red-500/20 rounded-3xl max-w-sm w-full animate-fade-in-up">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Enlace expirado</h2>
        <p className="text-red-200/70 font-light mt-1 text-center">Tus accesos son temporales por seguridad. Solicitá uno nuevo.</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-8 glass-button w-full py-3 rounded-xl font-semibold text-sm tracking-wide"
        >
          Volver a Intentarlo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center glass-panel border-green-500/20 rounded-3xl max-w-sm w-full animate-fade-in-up">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <span className="text-4xl text-green-400">✅</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">¡Acceso Correcto!</h2>
      <p className="text-green-200/70 font-light mt-1">Preparando sala de consultas...</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <Suspense fallback={<div className="text-blue-300/50 animate-pulse tracking-widest text-sm uppercase">Conectando...</div>}>
        <div className="relative z-10 w-full flex justify-center">
          <VerifyToken />
        </div>
      </Suspense>
    </main>
  );
}
