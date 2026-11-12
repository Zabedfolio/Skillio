import { createAuthClient } from 'better-auth/react';

/**
 * Better Auth client configuration for React/Next.js frontend.
 * Provides client-side methods: signIn, signUp, signOut, and useSession.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});

export const { signIn, signUp, signOut, useSession } = authClient;

