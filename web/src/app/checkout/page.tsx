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
    await new Promise(resolve => setTimeout(resolve, 3000));
    router.push('/success');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-mesh py-24 px-6 animate-premium">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Summary */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block italic">Medical Consultation Order</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">Ready for your visit.</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 glass rounded-[2.5rem] border border-white/40 shadow-premium">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-2 italic">Priority Access</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic">Consultation start within 15 mins of payment confirmation.</p>
            </div>
            <div className="p-8 glass rounded-[2.5rem] border border-white/40 shadow-premium">
              <div className="w-10 h-10 bg-brand-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-2 italic">Secured Records</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic">Encrypted E2E and HIPAA compliant medical session.</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/20 blur-3xl rounded-full -mr-24 -mt-24 group-hover:bg-brand-primary/30 transition-all duration-1000"></div>
             
             <h3 className="text-2xl font-black italic mb-10 tracking-tight">Order Summary</h3>
             
             <div className="space-y-6 mb-12">
               <div className="flex justify-between items-center pb-6 border-b border-white/10">
                 <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Digital Consultation</span>
                 <span className="font-bold text-lg">$29.00</span>
               </div>
               <div className="flex justify-between items-center text-green-400 italic">
                 <span className="text-xs font-black uppercase tracking-widest">Insurance Discount</span>
                 <span className="font-bold">-$0.00</span>
               </div>
               <div className="pt-10 flex justify-between items-end">
                 <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Grand Total</span>
                 <span className="text-6xl font-black tracking-tighter italic leading-none">$29</span>
               </div>
             </div>

             <button
               onClick={handlePayment}
               disabled={loading}
               className="w-full bg-brand-primary text-white py-6 rounded-3xl font-black text-xl hover:bg-brand-secondary transition-all duration-500 shadow-2xl shadow-brand-primary/20 active:scale-95 disabled:bg-slate-800 disabled:text-slate-500"
             >
               {loading ? (
                 <span className="flex items-center justify-center gap-4">
                   <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                   PROCESSING...
                 </span>
               ) : (
                 'CONFIRM & PAY →'
               )}
             </button>

             <div className="mt-8 flex justify-center gap-4 opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 invert" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 invert" />
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
