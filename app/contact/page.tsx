'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 70) {
      errs.name = 'Name cannot exceed 70 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please specify a subject.';
    } else if (formData.subject.trim().length < 4) {
      errs.subject = 'Subject must be at least 4 characters.';
    } else if (formData.subject.trim().length > 100) {
      errs.subject = 'Subject cannot exceed 100 characters.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 20) {
      errs.message = 'Message must be at least 20 characters to provide sufficient context.';
    } else if (formData.message.trim().length > 3000) {
      errs.message = 'Message cannot exceed 3,000 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      {/* Hero */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Editorial Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Let&rsquo;s Talk
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Have a question, suggestion, partnership idea or feedback? Get in touch with GamersPulse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-surface-border p-6 sm:p-8 shadow-card">
          {status === 'success' ? (
            <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 animate-in fade-in duration-300 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <h3 className="text-lg font-bold text-white">Message Received!</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thank you for reaching out to GamersPulse. Your message has been submitted via this frontend demonstration. Our editorial desk reviews incoming inquiries and will respond promptly once active communication channels are established.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-background font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name <span className="text-pulse">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  maxLength={70}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-surface-border focus:border-pulse focus:ring-1 focus:ring-pulse'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Email <span className="text-pulse">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-surface-border focus:border-pulse focus:ring-1 focus:ring-pulse'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Subject <span className="text-pulse">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Factual correction regarding Elden Ring guide"
                  maxLength={100}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.subject
                      ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-surface-border focus:border-pulse focus:ring-1 focus:ring-pulse'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Message <span className="text-pulse">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {formData.message.length} / 3,000 characters
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please provide details, article links if reporting an error, or your general feedback..."
                  maxLength={3000}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-surface-border focus:border-pulse focus:ring-1 focus:ring-pulse'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-all shadow-pulse-glow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Submitting Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-surface rounded-2xl border border-surface-border p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Editorial Integrity</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              We take factual accuracy seriously. If you spot a technical or factual discrepancy in any of our game guides, news stories, or reviews, our editors will investigate and update accordingly.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Official Domain: <strong>gamerspulse.site</strong>
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-surface-border p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-pulse" />
              <span>Response Turnaround</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inquiries submitted through this desk are triaged by topic. Factual corrections are treated with high priority and investigated within 24–48 hours.
            </p>
          </div>

          <AdSlot format="rectangle" slotId="contact-sidebar-rect" />
        </div>
      </div>
    </div>
  );
}
