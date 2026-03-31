'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestMagicLink } from '@/lib/api';

export default function Onboarding() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestMagicLink(email);
      setSent(true);
    } catch (error) {
      console.error(error);
      alert('Error sending magic link');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-6 animate-premium">
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-brand-primary text-white rounded-[2.5rem] transform rotate-12 shadow-2xl shadow-brand-primary/40">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">Link Sent!</h2>
        <p className="text-slate-400 font-medium mb-12">
          We've sent a secure access link to <br/>
          <strong className="text-brand-primary font-black uppercase text-xs tracking-widest">{email}</strong>
        </p>
        
        {process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && (
          <div className="mb-12 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 blur-2xl rounded-full -mr-12 -mt-12"></div>
             <div className="absolute top-4 left-6 bg-brand-primary text-white text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em]">
              DEMO TOOL
            </div>
            <p className="text-xs text-slate-400 mb-8 font-bold italic tracking-wide">Simulation: Open email on patient device</p>
            <button
              onClick={() => router.push('/auth/verify?token=mock-token')}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary transition-all duration-500 shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Access Patient Desktop 🖱️
            </button>
          </div>
        )}

        <button 
          onClick={() => setSent(false)}
          className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-primary transition-colors duration-300"
        >
          ← Use different email
        </button>
      </div>
    );
  }

  return (
    <div className="text-left py-4">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">02</div>
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Identity</h2>
      </div>

      <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic leading-none text-balance">Passwordless Access.</h3>
      <p className="text-slate-400 text-sm mb-12 font-medium">Your security is paramount. We'll send a one-time link to verify your medical session.</p>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="relative">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Work or Personal Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-6 py-5 bg-slate-50 border-transparent rounded-[2rem] text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none"
            placeholder="e.g. john@hospital.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-brand-primary hover:shadow-2xl hover:shadow-brand-primary/30 transition-all duration-500 active:scale-95"
        >
          {loading ? 'Generating Link...' : 'Request Access Link →'}
        </button>

        <div className="pt-10 border-t border-slate-100 flex items-center justify-between grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em]">Bank-Level Security</p>
        </div>
      </form>
    </div>
  );
}
