'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/services/authService';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

/**
 * Page: AdminLoginPage (/admin/login)
 * Administrator authentication portal.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuickFill = () => {
    setEmail('admin@skillio.com');
    setPassword('Admin@123');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both admin email and password.');
      return;
    }

    try {
      setIsLoading(true);

      // 1. Sign in with Better Auth session to sync active role and navbar profile
      try {
        await signIn.email({ email, password });
      } catch (authErr) {
        console.warn('Better Auth session sync fallback:', authErr);
      }

      // 2. Authenticate against backend to obtain admin Bearer JWT for CRUD operations
      await adminLogin(email, password);
      setIsLoading(false);
      toast.success('Admin login successful! Welcome to Skillio Console.');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Invalid admin credentials.';
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-primary-light/50 via-white to-accent/10 overflow-hidden">
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
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Skillio"
          >
            <Image
              src="/skillio.png"
              alt="Skillio"
              width={813}
              height={325}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            Admin Access Only
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Login
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Sign in with administrative privileges to manage courses & lectures
          </p>
        </div>

        {/* Inline Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-fadeIn"
          >
            <svg
              className="w-4 h-4 shrink-0 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Admin Email
            </label>
            <input
              type="email"
              id="admin-email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@skillio.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
            />
          </div>

          {/* Password with Show/Hide Toggle */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:text-primary transition-colors"
              >
                {showPassword ? (
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
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>Authenticating Admin...</span>
              </>
            ) : (
              <span>Sign In as Admin</span>
            )}
          </button>
        </form>

        {/* Quick Fill Helper */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-xs font-semibold text-primary hover:text-primary-dark hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m18 15-6-6-6 6" />
            </svg>
            <span>Click to Autofill Admin Credentials (admin@skillio.com)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

