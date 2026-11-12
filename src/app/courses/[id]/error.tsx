'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for /courses/[id] route.
 */
export default function CourseDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Course detail error boundary captured:', error);
  }, [error]);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto text-center py-12 px-6 bg-white/95 backdrop-blur-md rounded-3xl border border-red-200/80 shadow-xl">
        <div
          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center border border-red-200/60"
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Unable to load course
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          {error.message || 'We could not retrieve this course. It may have been removed or the server is unavailable.'}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/courses"
            className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            Back to courses
          </Link>
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

