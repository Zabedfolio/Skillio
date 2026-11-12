'use client';

import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
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
 * Authentication actions with modern visual hierarchy.
 * Displays the logged-in user's name via useSession() alongside Logout,
 * or Sign in / Sign up buttons when unauthenticated.
 */
export default function AuthActions({
  role,
  isAuthenticated,
  isReady,
  onLogout,
  onNavigate,
  isMobile = false,
}: AuthActionsProps) {
  const { data: session } = useSession();

  // Determine user display name from session
  const userName =
    session?.user?.name ||
    session?.user?.email?.split('@')[0] ||
    (role === 'admin' ? 'Admin' : 'User');

  // console.log(userName)

  const initial = (userName.charAt(0) || 'U').toUpperCase();

  // Prevent layout shifts during hydration
  if (!isReady) {
    return (
      <div
        className={
          isMobile
            ? 'w-full h-11 invisible'
            : isAuthenticated
            ? 'w-44 h-8 invisible'
            : 'w-40 h-8 invisible'
        }
        aria-hidden="true"
      />
    );
  }

  // 1. Authenticated User (Student or Admin): Show Name + Logout
  if (isAuthenticated) {
    if (isMobile) {
      return (
        <div className="flex flex-col w-full gap-3">
          {/* Mobile User Profile Summary */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-xs"
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {userName}
              </span>
              {session?.user?.email && (
                <span className="text-xs text-slate-500 truncate">
                  {session.user.email}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Logout Button */}
          <button
            type="button"
            onClick={() => {
              onLogout();
              if (onNavigate) onNavigate();
            }}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-red-200/80 bg-red-50/40 text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Logout
          </button>
        </div>
      );
    }

    // Desktop Authenticated View
    return (
      <div className="flex items-center gap-3">
        {/* User Pill with Avatar Initial & Name */}
        <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 bg-slate-50 border border-slate-200/90 rounded-full shadow-2xs">
          <div
            className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs select-none"
            aria-hidden="true"
          >
            {initial}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate max-w-[150px]">
            {userName}
          </span>
        </div>

        {/* Desktop Logout Button */}
        <button
          type="button"
          onClick={() => {
            onLogout();
            if (onNavigate) onNavigate();
          }}
          className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50/50 text-slate-700 hover:text-red-600 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Logout
        </button>
      </div>
    );
  }

  // 2. Unauthenticated Admin Guest (handled by the "Login" nav link)
  if (role === 'admin') {
    return null;
  }

  // 3. Unauthenticated Student (Default)
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
