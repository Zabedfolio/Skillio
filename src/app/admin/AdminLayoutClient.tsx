'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useRole } from '@/hooks/useRole';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client Component: AdminLayoutClient
 * Enforces authentication access control and renders sub-navigation tabs.
 */
export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuthStatus();
  const { role, isPending: isRolePending } = useRole();

  // Allow unrestricted access to the admin login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isReady && !isRolePending && (!isAuthenticated || role !== 'admin') && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [isReady, isRolePending, isAuthenticated, role, isLoginPage, router]);

  // While checking auth state on client
  if (!isReady) {
    if (isLoginPage) {
      return <>{children}</>;
    }
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Verifying Admin Session...
          </span>
        </div>
      </div>
    );
  }

  // Render clean login layout when on /admin/login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated and not yet redirected, prevent flashing protected UI
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated Admin Dashboard Layout with Sub-Navigation Bar
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60">
      {/* Admin Top Action / Context Header */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Badge + Breadcrumb */}
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide border border-primary/20">
              Admin Console
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Skillio Management Portal
            </span>
          </div>

          {/* Right: Quick Action Tabs */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/admin'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/admin/courses"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/admin/courses'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Courses
            </Link>
            <Link
              href="/admin/courses/new"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent shadow-xs hover:shadow-md hover:brightness-105 transition-all inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>New Course</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}

