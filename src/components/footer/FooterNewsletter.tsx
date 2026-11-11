'use client';

import { useState } from 'react';

/**
 * Component: FooterNewsletter
 * Interactive newsletter subscription form with clean client-side feedback.
 */
export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate successful subscription
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="w-full">
      {isSubscribed ? (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Thank you for subscribing to Skillio updates!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <div>
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Enter Email Address
            </label>
            <input
              type="email"
              id="footer-newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              required
              className="w-full bg-[#182030] border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <span>Sign Up</span>
          </button>
        </form>
      )}
    </div>
  );
}

