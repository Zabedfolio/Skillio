'use client';

import Link from 'next/link';
import { Role } from '@/types';

export interface AuthActionsProps {
  role: Role;
  isAuthenticated: boolean;
  isReady: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
  isMobile?: boolean;
}

/**
 * Component: AuthActions
 * Refined authentication actions with modern visual hierarchy.
 *
 * NOTE: Student sign in / sign up are UI placeholders. Student registration is
 * not part of the task requirements. Only admin authentication is implemented.
 */
export default function AuthActions({
  role,
  isAuthenticated,
  isReady,
  onLogout,
  onNavigate,
  isMobile = false,
}: AuthActionsProps) {
  // Prevent layout shifts during hydration
  if (!isReady) {
    return (
      <div
        className={
          isMobile
            ? 'w-full h-11 invisible'
            : role === 'student'
            ? 'w-40 h-8 invisible'
            : isAuthenticated
            ? 'w-20 h-8 invisible'
            : 'hidden'
        }
        aria-hidden="true"
      />
    );
  }

  // 1. Student Portal Auth Actions
  if (role === 'student') {
    return (
      <div
        className={`flex items-center ${
          isMobile ? 'flex-col w-full gap-2.5' : 'gap-2'
        }`}
      >
        <Link
          href="/signin"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isMobile
              ? 'w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'px-3.5 py-1.5 rounded-full text-slate-700 hover:text-primary hover:bg-slate-100/70'
          }`}
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center text-sm font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-xs hover:shadow-md hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
            isMobile
              ? 'w-full min-h-[44px] px-4 py-2.5 rounded-xl'
              : 'px-4 py-1.5 rounded-full'
          }`}
        >
          Sign up
        </Link>
      </div>
    );
  }

  // 2. Admin Portal Auth Actions
  // Unauthenticated admin shows nothing here (handled by the "Login" nav link)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated admin: Clean Logout action
  return (
    <div className={isMobile ? 'w-full' : 'flex items-center'}>
      <button
        type="button"
        onClick={() => {
          onLogout();
          if (onNavigate) onNavigate();
        }}
        className={`inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isMobile
            ? 'w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-red-200/80 bg-red-50/40 text-red-600 hover:bg-red-50 font-semibold'
            : 'px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50/50 text-slate-700 hover:text-red-600'
        }`}
      >
        Logout
      </button>
    </div>
  );
}
