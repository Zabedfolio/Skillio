'use client';

import { usePathname } from 'next/navigation';
import { Role } from '@/types';

/**
 * Hook: useRole
 * Derives the active user role dynamically from the current URL pathname.
 *
 * Rule: Paths starting with "/admin" operate under the "admin" role context;
 * all other paths default to the "student" role context.
 *
 * No role state is stored in React state or localStorage.
 */
export function useRole(): { role: Role } {
  const pathname = usePathname();
  const role: Role = pathname?.startsWith('/admin') ? 'admin' : 'student';

  return { role };
}

