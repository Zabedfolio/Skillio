import { Admin, ApiResponse } from '@/types';

export interface LoginResponse {
  token: string;
  admin: Admin;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Service: authService
 * Handles administrator authentication against the Skillio backend API.
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result: ApiResponse<LoginResponse> = await res.json();

  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Authentication failed. Please check credentials.');
  }

  // Store JWT token and admin info in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('admin', JSON.stringify(result.data.admin));
    window.dispatchEvent(new Event('storage'));
  }

  return result.data;
}

/**
 * Retrieves the stored admin token from localStorage.
 */
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Retrieves the stored admin token or asynchronously obtains one for the active
 * Better Auth session from the internal Next.js auth token route.
 */
export async function getAdminTokenAsync(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const existing = localStorage.getItem('token');
  if (existing) return existing;

  try {
    const res = await fetch('/api/auth/token');
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.token) {
        localStorage.setItem('token', result.token);
        if (result.admin) {
          localStorage.setItem('admin', JSON.stringify(result.admin));
        }
        window.dispatchEvent(new Event('storage'));
        return result.token;
      }
    }
  } catch {
    // Session token retrieval fallback
  }

  return null;
}

/**
 * Logs out the administrator by clearing credentials and dispatching storage update.
 */
export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.dispatchEvent(new Event('storage'));
  }
}

