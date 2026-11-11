'use client';

import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Role } from '@/types';

export interface RoleSwitchProps {
  isMobile?: boolean;
  onSelect?: () => void;
}

/**
 * Component: RoleSwitch
 * Redesigned segmented control for quick portal switching.
 *
 * NOTE: This toggle is only a navigation shortcut. It does NOT grant access.
 * Real protection is enforced by the backend (JWT) and ProtectedRoute.
 */
export default function RoleSwitch({
  isMobile = false,
  onSelect,
}: RoleSwitchProps) {
  const router = useRouter();
  const { role } = useRole();
  const { isAuthenticated, isReady } = useAuthStatus();

  // Prevent layout shifts during hydration
  if (!isReady) {
    return (
      <div
        className={`${
          isMobile ? 'w-full h-11 rounded-xl' : 'w-44 h-8 rounded-full'
        } bg-slate-100/80 invisible`}
        aria-hidden="true"
      />
    );
  }

  const handleRoleChange = (newRole: Role) => {
    if (newRole === role) return;

    if (newRole === 'student') {
      router.push('/');
    } else {
      if (isAuthenticated) {
        router.push('/admin');
      } else {
        router.push('/admin/login');
      }
    }

    if (onSelect) {
      onSelect();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' && role === 'student') {
      e.preventDefault();
      handleRoleChange('admin');
    } else if (e.key === 'ArrowLeft' && role === 'admin') {
      e.preventDefault();
      handleRoleChange('student');
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Switch role"
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center bg-slate-100/90 border border-slate-200/70 select-none ${
        isMobile ? 'w-full h-11 p-1 rounded-xl' : 'h-8 w-44 p-0.5 rounded-full'
      }`}
    >
      {/* Sliding active pill indicator */}
      <div
        aria-hidden="true"
        className={`absolute shadow-xs bg-gradient-to-r from-primary to-accent transition-transform duration-200 ease-out pointer-events-none ${
          isMobile
            ? `top-1 bottom-1 w-[calc(50%-4px)] rounded-lg ${
                role === 'student' ? 'translate-x-0' : 'translate-x-full'
              }`
            : `top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full ${
                role === 'student' ? 'translate-x-0' : 'translate-x-full'
              }`
        }`}
      />

      {/* Student Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={role === 'student'}
        tabIndex={role === 'student' ? 0 : -1}
        onClick={() => handleRoleChange('student')}
        className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
          isMobile ? 'rounded-lg' : 'rounded-full'
        } ${
          role === 'student'
            ? 'text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span>Student</span>
      </button>

      {/* Admin Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={role === 'admin'}
        tabIndex={role === 'admin' ? 0 : -1}
        onClick={() => handleRoleChange('admin')}
        className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
          isMobile ? 'rounded-lg' : 'rounded-full'
        } ${
          role === 'admin'
            ? 'text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Admin</span>
      </button>
    </div>
  );
}
