'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

/**
 * Helper to determine active state with exact/prefix matching rules:
 * - Exact match for "/" and "/admin"
 * - Prefix match for rest ("/courses", "/about", "/admin/courses/new")
 * - "/admin/courses/new" ("Add Course") takes precedence over "/admin/courses" ("Manage Courses")
 */
function isLinkActive(href: string, pathname: string): boolean {
  if (href === '/' || href === '/admin') {
    return pathname === href;
  }

  if (href === '/admin/courses') {
    // Prevent "Manage Courses" from highlighting when "Add Course" is active
    if (pathname === '/admin/courses/new' || pathname.startsWith('/admin/courses/new/')) {
      return false;
    }
    return pathname === '/admin/courses' || pathname.startsWith('/admin/courses/');
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Component: NavLink
 * Config-driven navigation link styled as a modern rounded pill.
 * Conforms to WCAG 1.4.1 by providing high-contrast text, background tint,
 * and border indicators so active state is not communicated by color alone.
 */
export default function NavLink({
  href,
  label,
  onClick,
  className = '',
  isMobile = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isLinkActive(href, pathname || '');

  // Desktop styles: sleek rounded pill
  const desktopBase =
    'px-3.5 py-1.5 text-sm rounded-full transition-all duration-150 inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1';
  const desktopState = isActive
    ? 'text-primary bg-primary/10 border border-primary/20 font-semibold shadow-2xs'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium border border-transparent';

  // Mobile styles: comfortable full-width row with left accent indicator
  const mobileBase =
    'w-full min-h-[44px] px-4 py-2.5 text-base rounded-xl transition-all duration-150 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  const mobileState = isActive
    ? 'text-primary bg-primary/10 border-l-4 border-l-primary font-semibold pl-3.5'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        isMobile
          ? `${mobileBase} ${mobileState} ${className}`
          : `${desktopBase} ${desktopState} ${className}`
      }
      aria-current={isActive ? 'page' : undefined}
    >
      <span>{label}</span>
      {isMobile && isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
      )}
    </Link>
  );
}
