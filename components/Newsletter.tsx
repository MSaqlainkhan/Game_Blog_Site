'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface NewsletterProps {
  className?: string;
}

export function Newsletter({ className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate realistic validation delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section
      aria-label="Newsletter Subscription"
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-elevated to-surface border border-surface-border p-8 md:p-12 ${className}`}
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pulse/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pulse/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Gaming Dispatch</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Stay in the Game
        </h2>

        <p className="text-sm md:text-base text-slate-300 mb-8 leading-relaxed">
          Get gaming news, honest reviews, actionable guides and discovery recommendations delivered with editorial integrity.
        </p>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3 animate-in fade-in duration-300">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-left text-sm">
              <strong className="block font-bold">Thank you for your interest!</strong>
              <span>
                Your request has been simulated on this frontend demonstration. When public newsletter dispatch connects, subscribers will receive our weekly digest.
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                aria-label="Email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-surface-border text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pulse focus:ring-1 focus:ring-pulse transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-pulse hover:bg-pulse-hover text-background font-bold text-sm transition-all duration-200 shadow-pulse-glow disabled:opacity-50 shrink-0"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <p className="mt-4 text-[11px] text-slate-500">
          No spam, no tracking pixels. Unsubscribe anytime. Independent gaming journalism since 2024.
        </p>
      </div>
    </section>
  );
}
