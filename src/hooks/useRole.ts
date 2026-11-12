'use client';

import { useSession } from '@/lib/auth-client';
import { Role } from '@/types';

/**
 * Hook: useRole
 * Derives the active user role dynamically from the logged-in user using Better Auth's useSession().
 * The default role is "student" whenever no user is logged in or the user does not have an admin role.
 */
export function useRole(): {
  role: Role;
  isPending: boolean;
} {
  const { data: session, isPending } = useSession();

  // Extract role from session user or stored admin credentials; defaults to 'student'
  const userRole = (session?.user as { role?: string } | undefined)?.role;
  let storedAdminRole: string | undefined;

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('admin');
      if (stored) {
        const parsed = JSON.parse(stored);
        storedAdminRole = parsed?.role;
      }
    } catch {
      // ignore parsing error
    }
  }

  const role: Role = userRole === 'admin' || storedAdminRole === 'admin' ? 'admin' : 'student';

  return { role, isPending };
}
