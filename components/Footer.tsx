import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Mail, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-surface-border">
          {/* Publication Identity */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight mb-4 group"
            >
              <div className="w-8 h-8 rounded-xl bg-pulse/10 border border-pulse/30 flex items-center justify-center text-pulse shadow-pulse-glow">
                <Activity className="w-4 h-4 text-pulse" />
              </div>
              <span className="leading-none">
                Gamers<span className="text-pulse">Pulse</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              Your daily pulse on gaming. Dedicated to honest game reviews, actionable guides, technology analysis, and discovering great games across PC and consoles.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent editorial coverage. No sponsored review scores.</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/games" className="text-slate-400 hover:text-pulse transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-slate-400 hover:text-pulse transition-colors">
                  Game Reviews
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-400 hover:text-pulse transition-colors">
                  Gaming Guides
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-400 hover:text-pulse transition-colors">
                  Industry & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Editorial */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-pulse transition-colors">
                  About GamersPulse
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-slate-400 hover:text-pulse transition-colors">
                  Editorial Policy & Ethics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-pulse transition-colors">
                  Contact & Corrections
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-pulse transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-slate-400 hover:text-pulse transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <Link href="/contact" className="hover:text-slate-300 transition-colors">
                    Report an error
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 GamersPulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Domain: <strong className="text-slate-400 font-mono">gamerspulse.site</strong></span>
            <span>•</span>
            <span>Independent Gaming Publication</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
