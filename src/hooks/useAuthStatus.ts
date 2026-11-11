'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { useRouter } from 'next/navigation';

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

// No-op subscriber for client hydration readiness
const emptySubscribe = () => () => {};

/**
 * Hook: useAuthStatus (Placeholder)
 *
 * NOTE: This is a placeholder hook for initial UI development.
 * It uses useSyncExternalStore to coordinate client hydration readiness
 * and token synchronization across tabs without triggering cascading render
 * warnings or hydration mismatches.
 *
 * This hook will be replaced by the real AuthContext later.
 */
export function useAuthStatus(): AuthStatus {
  const router = useRouter();

  // isReady is false during SSR & initial client hydration, true once mounted on client
  const isReady = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const token = useSyncExternalStore(
    subscribeStorage,
    getSnapshotToken,
    getServerSnapshotToken
  );

  const isAuthenticated = Boolean(token);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  }, [router]);

  return {
    isAuthenticated,
    isReady,
    logout,
  };
}
