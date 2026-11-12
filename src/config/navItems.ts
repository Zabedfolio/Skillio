import { NavItem } from '@/types';

/**
 * Navigation items for Student role.
 * Rendered when current path does not begin with "/admin".
 */
export const studentNavItems: readonly NavItem[] = [
  { label: 'Courses', href: '/courses' },
] as const;

/**
 * Navigation items for authenticated Admin role.
 * Rendered when path starts with "/admin" and a valid token exists.
 */
export const adminNavItems: readonly NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Manage Courses', href: '/admin/courses' },
  { label: 'Add Course', href: '/admin/courses/new' },
] as const;

/**
 * Navigation items for unauthenticated Admin guest.
 * Rendered when path starts with "/admin" but no auth session is active.
 */
export const adminGuestNavItems: readonly NavItem[] = [
  { label: 'Login', href: '/admin/login' },
] as const;

