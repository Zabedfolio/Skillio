import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404: Page Not Found | Skillio',
  description: 'The page you are looking for could not be found on Skillio.',
};

/**
 * Page: NotFound (404)
 * Custom branded 404 error page matching the Skillio color palette and design language.
 */
export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary-light/50 via-white to-accent/10 overflow-hidden">
      {/* Decorative blurred background orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Error 404</span>
        </div>

        {/* 404 Bold Graphic */}
        <div className="relative my-2 select-none">
          <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-primary via-primary-dark to-accent bg-clip-text text-transparent drop-shadow-sm">
            404
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Explore Courses</span>
          </Link>

          <Link
            href="/signin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>Sign In</span>
            <svg
              className="w-4 h-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
          Need assistance?{' '}
          <a
            href="mailto:support@skillio.com"
            className="font-medium text-primary hover:text-primary-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Contact Skillio Support
          </a>
        </div>
      </div>
    </main>
  );
}

