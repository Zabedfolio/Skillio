'use client';

import Link from 'next/link';
import Image from 'next/image';
import FooterNewsletter from './FooterNewsletter';
import ScrollToTopButton from './ScrollToTopButton';

/**
 * Component: Footer
 * High-contrast dual-card dark footer for Skillio LMS.
 * Designed to match the provided platform aesthetic with clean responsive cards,
 * social links, newsletter subscription, and DataPollex attribution.
 */
export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#070B12] text-slate-400 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Main Grid: Left Card + Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Brand Showcase & Socials */}
          <div className="lg:col-span-4 bg-[#0E1524] border border-slate-800/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle ambient glow in top corner */}
            <div
              className="absolute -top-12 -right-12 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Brand Logo & Tagline */}
              <div className="flex items-start gap-3 mb-4">
                <Link
                  href="/"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  aria-label="Skillio Home"
                >
                  <Image
                    src="/skillio.png"
                    alt="Skillio"
                    width={813}
                    height={325}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              </div>
              <span className="inline-block text-[10px] font-bold text-accent tracking-widest uppercase mb-3">
                Online Learning Platform
              </span>

              {/* Value Proposition Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                100% structured courses, high-quality video lessons, and interactive
                learning journeys built for future-ready engineers. 3 years of trust and
                genuine educational goodwill.
              </p>
            </div>

            {/* Divider and Socials */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Stay in touch!
                </span>
                <div className="flex items-center gap-2">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Follow Skillio on Facebook"
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contact Skillio on WhatsApp"
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+1234567890"
                    aria-label="Call Skillio support"
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:support@skillio.com"
                    aria-label="Email Skillio"
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Explore, Newsletter & Support */}
          <div className="lg:col-span-8 bg-[#0E1524] border border-slate-800/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle background watermark */}
            <div
              className="absolute -bottom-8 -right-8 w-64 h-64 opacity-5 pointer-events-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-white">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            {/* Three-column navigation grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: EXPLORE */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Explore
                </h3>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/courses"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Featured Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Why Choose Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Student Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      How to Enroll
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Our Heritage
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: NEWSLETTER */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Newsletter
                </h3>
                <p className="text-xs text-slate-400 mb-3.5 leading-relaxed">
                  Join our learning circle for fresh course drops, syllabus updates,
                  and authentic batches.
                </p>
                <FooterNewsletter />
              </div>

              {/* Column 3: SUPPORT */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Support
                </h3>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Terms & Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Order History & Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      WhatsApp Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Attribution */}
            <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>© Copyright 2026. Skillio All Rights Reserved.</p>
              <p>
                Powered By{' '}
                <span className="font-semibold text-slate-300">
                  DataPollex
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Area: Scroll-to-Top Button */}
        <div className="flex items-center justify-start pt-2">
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}

