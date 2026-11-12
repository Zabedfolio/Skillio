'use client';

import { useEffect } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for /courses route.
 * Catches data-fetching or rendering failures, logs details to console,
 * and presents an accessible recovery prompt to the user.
 */
export default function CoursesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely to the console without exposing stack trace in the UI
    console.error('Course catalog error boundary captured:', error);
  }, [error]);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 overflow-hidden">
      {/* Decorative blurred background circles */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <PageHeader />
        <ErrorMessage
          message={
            error.message ||
            'We could not load the course list right now. Please verify that the backend API is active and try again.'
          }
          onRetry={reset}
        />
      </div>
    </main>
  );
}

