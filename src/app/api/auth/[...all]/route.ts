import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

/**
 * Better Auth catch-all API route handler for Next.js App Router.
 * Handles all authentication requests under /api/auth/*
 */
export const { GET, POST } = toNextJsHandler(auth);

