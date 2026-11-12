import { Suspense } from 'react';
import AdminLayoutClient from './AdminLayoutClient';

export const instant = false;

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Server Component Layout: AdminLayout
 * Wraps client-side route protection & navigation in Suspense to support Next.js partial prerendering.
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Loading Admin Portal...
            </span>
          </div>
        </div>
      }
    >
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </Suspense>
  );
}
