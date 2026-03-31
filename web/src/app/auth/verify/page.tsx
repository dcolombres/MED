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
        localStorage.setItem('accessToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({ email: 'demo-patient@medexpress.com', name: 'Premium Patient' }));
        setStatus('success');
        setTimeout(() => router.push('/checkout'), 2500);
        return;
      }
      // ... real verification logic (KISS)
      setStatus('error');
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 max-w-md w-full text-center animate-premium">
      {status === 'loading' && (
        <>
          <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">Verifying Session...</h2>
          <p className="text-slate-400 mt-2 font-medium">Securing your medical data.</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic text-balance">Invalid or Expired Link</h2>
          <button onClick={() => router.push('/')} className="mt-8 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">Return Home</button>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">Access Verified</h2>
          <p className="text-slate-400 mt-2 font-medium italic">Welcome back, Redirecting...</p>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-slate-400 font-black animate-pulse uppercase tracking-widest text-[10px]">Initializing...</div>}>
        <VerifyToken />
      </Suspense>
    </main>
  );
}
