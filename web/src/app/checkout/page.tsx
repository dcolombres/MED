'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (!storedUser || !token) {
      router.push('/');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
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
    <main className="min-h-screen bg-slate-50/50 py-20 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Columna Izquierda: Información */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Finaliza tu solicitud</h1>
              <p className="text-slate-500 leading-relaxed">Estás a un paso de conectar con un médico. Al confirmar el pago, entrarás a la sala de espera prioritaria.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Triaje completado</h4>
                  <p className="text-xs text-slate-400">Datos médicos listos para el doctor.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm opacity-60">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Pago de la consulta</h4>
                  <p className="text-xs text-slate-400">Procesamiento seguro mediante Stripe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resumen de Pago (Tarjeta Premium) */}
          <div className="w-full md:w-[400px]">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16"></div>
              
              <h2 className="text-xl font-bold mb-8 relative">Resumen de Consulta</h2>
              
              <div className="space-y-6 mb-10 relative">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Servicio</span>
                  <span className="font-bold">Telemedicina Express</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Paciente</span>
                  <span className="font-bold">{user.email.split('@')[0]}...</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>Disponibilidad</span>
                  <span className="font-black italic">Inmediata</span>
                </div>
                <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                  <span className="text-slate-400 text-sm">Total</span>
                  <span className="text-4xl font-black">$29<span className="text-sm font-normal text-slate-500 ml-1">.00</span></span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-5 rounded-2xl font-black text-lg transition-all transform active:scale-[0.98] shadow-xl shadow-blue-900/20"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </div>
                ) : (
                  'Pagar y Continuar'
                )}
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                <span>Encriptación AES-256</span>
              </div>
            </div>

            <p className="text-center text-[10px] text-slate-400 mt-6 px-8 leading-relaxed">
              Al pagar, aceptas nuestros términos de servicio y la política de privacidad médica.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
