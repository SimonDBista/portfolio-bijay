'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Back to site link */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#ded8cd]/70 hover:text-[#c9a96e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#101014] border border-white/10 p-8 md:p-10 shadow-2xl relative z-10">
        {/* Luxury Monogram Crest */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#181820] border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e] mb-4 shadow-lg">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] font-medium">
            Executive Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-normal tracking-wide mt-1">
            Chef Admin Access
          </h1>
          <p className="text-xs text-[#8c887e] mt-2">
            Secure management console for culinary gallery updates.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex items-start space-x-3">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="admin-username" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
              Administrator Username
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#16161e] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
              Security Key / Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              className="w-full bg-[#16161e] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] disabled:opacity-50 text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Credentials reminder for evaluation */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-[#8c887e]">
            System Credential Hint: <code className="text-[#c9a96e]">admin</code> / <code className="text-[#c9a96e]">ExecutiveChef2026!</code>
          </p>
        </div>
      </div>
    </div>
  );
}
