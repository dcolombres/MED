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
    setConsultationId(`MED-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-mesh py-12 px-6 flex flex-col items-center justify-center animate-premium">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated Celebration Icon */}
        <div className="mb-16 relative inline-flex">
          <div className="absolute inset-0 bg-brand-primary blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-slate-900 rounded-[3rem] flex items-center justify-center text-brand-primary shadow-2xl transform -rotate-12 border border-white/10 group">
             <svg className="w-16 h-16 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
             </svg>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter italic leading-none">All set, {user.email.split('@')[0]}.</h1>
        <p className="text-xl text-slate-400 mb-16 font-medium italic">Payment confirmed. Your medical consultant is joining shortly.</p>

        {/* Status Card */}
        <div className="glass rounded-[3.5rem] p-12 mb-16 border border-white/40 shadow-premium text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          
          <div className="space-y-8 relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session ID</span>
              <span className="text-sm font-mono font-bold text-brand-primary bg-brand-primary/5 px-4 py-2 rounded-xl">{consultationId}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Email</span>
              <span className="text-sm font-bold text-slate-900">{user.email}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Room Status</span>
              <div className="flex items-center gap-3">
                 <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </span>
                 <span className="text-xs font-black text-green-600 uppercase tracking-widest italic">Waiting Room Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-8">
          <button
            onClick={() => alert('Opening Secure Video Room...')}
            className="w-full bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-2xl hover:bg-brand-primary transition-all duration-500 shadow-2xl shadow-slate-900/10 active:scale-95 italic"
          >
            Enter Medical Room →
          </button>
          
          <div className="p-6 bg-slate-50 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Note: You'll receive a digital signature request for your **Medical Certificate (UC-06)** immediately after the call ends.
          </div>

          <button
            onClick={() => router.push('/')}
            className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] hover:text-brand-primary transition-all py-4"
          >
            Return to Dashboard
          </button>
        </div>

      </div>
    </main>
  );
}
