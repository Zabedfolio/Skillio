'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';

export interface AuthStatus {
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => void;
}

// Storage event subscriber
function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshotToken(): string | null {
  return localStorage.getItem('token');
}

function getServerSnapshotToken(): string | null {
  return null;
}

/**
 * Hook: useAuthStatus
 * Coordinates client hydration readiness and authentication state
 * across Better Auth session and localStorage tokens.
 */
export function useAuthStatus(): AuthStatus {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const token = useSyncExternalStore(
    subscribeStorage,
    getSnapshotToken,
    getServerSnapshotToken
  );

  const isAuthenticated = Boolean(session?.user || token);
  const isReady = !isPending;

  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    try {
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
    router.push('/courses');
    router.refresh();
  }, [router]);

  return {
    isAuthenticated,
    isReady,
    logout,
  };
}
