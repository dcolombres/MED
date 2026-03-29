'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar sesión (KISS)
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (!storedUser || !token) {
      router.push('/'); // Redirigir si no hay sesión
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Aquí iría la integración con Stripe / Backend Payment
      // Para el MVP: Simulación exitosa tras 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('¡Pago completado con éxito!');
      router.push('/success');
    } catch (error) {
      console.error(error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-blue-900">Finaliza tu consulta</h1>
          <p className="mt-2 text-gray-600">Confirma los detalles para conectar con tu médico.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen de la Consulta</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="text-gray-600">Paciente</span>
                <span className="font-semibold text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="text-gray-600">Servicio</span>
                <span className="font-semibold text-gray-900">Telemedicina Express</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="text-gray-600">Disponibilidad</span>
                <span className="text-green-600 font-semibold italic">Médico asignado (Inmediato)</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold text-gray-800">Total a pagar</span>
                <span className="text-2xl font-black text-blue-700">$29.00 USD</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-8 flex items-start space-x-3 border border-blue-100">
              <div className="text-blue-500 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-blue-800">
                Tu triaje ya ha sido procesado. Al completar el pago, entrarás directamente a la sala de espera virtual.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-800 shadow-lg shadow-blue-200 transition-all disabled:bg-gray-400 disabled:shadow-none"
            >
              {loading ? 'Procesando Pago...' : 'Pagar y Consultar'}
            </button>
            
            <p className="mt-4 text-center text-xs text-gray-400">
              Pago seguro encriptado con tecnología de nivel bancario (SSL).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
