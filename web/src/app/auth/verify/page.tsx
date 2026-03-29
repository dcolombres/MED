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
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Verificando tu acceso...</h2>
        <p className="text-gray-500 mt-2">Estamos validando tu enlace mágico.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl border border-red-100">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <h2 className="text-xl font-bold text-red-800">Enlace no válido</h2>
        <p className="text-red-600 mt-2">El enlace ha expirado o ya fue utilizado.</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-6 text-blue-600 font-semibold hover:underline"
        >
          Volver a intentarlo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-green-50 rounded-xl border border-green-100">
      <div className="text-green-500 mb-4 text-4xl">✅</div>
      <h2 className="text-xl font-bold text-green-800">¡Acceso verificado!</h2>
      <p className="text-green-600 mt-2">Redirigiéndote al pago de tu consulta...</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <VerifyToken />
      </Suspense>
    </main>
  );
}
