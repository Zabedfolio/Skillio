'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import NavLink from './NavLink';
import AuthActions from './AuthActions';
import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useRole } from '@/hooks/useRole';
import {
  studentNavItems,
  adminNavItems,
  adminGuestNavItems,
} from '@/config/navItems';
import { NavItem } from '@/types';

/**
 * Component: Navbar
 * Redesigned navigation bar for Skillio LMS.
 * Features:
 * - Frosted glass header (bg-white/80 backdrop-blur-md)
 * - 3-zone desktop layout with refined spacing and micro-interactions
 * - Accessible mobile collapsible drawer with structured sections
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { role } = useRole();
  const { isAuthenticated, isReady, logout } = useAuthStatus();

  // 1. Reset mobile menu when route changes (render-phase state update pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Compute active navigation list based on role and auth status
  const currentNavItems: readonly NavItem[] = useMemo(() => {
    if (role === 'student') {
      return studentNavItems;
    }
    return isAuthenticated ? adminNavItems : adminGuestNavItems;
  }, [role, isAuthenticated]);

  // 2. Close menu on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 3. Close menu when viewport resizes past the lg (1024px) breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // 4. Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* Zone 1 (Left): Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo onClick={closeMenu} />
        </div>

        {/* Zone 2 (Center): Config-driven Navigation Items */}
        <div className="hidden lg:flex items-center gap-1 px-1.5 py-1 bg-slate-50/80 rounded-full border border-slate-200/50">
          {currentNavItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* Zone 3 (Right): Auth Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <AuthActions
            role={role}
            isAuthenticated={isAuthenticated}
            isReady={isReady}
            onLogout={logout}
          />
        </div>

        {/* Mobile/Tablet (< lg): Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <HamburgerButton
            isOpen={isOpen}
            onClick={toggleMenu}
            controlsId="mobile-menu"
          />
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <MobileMenu id="mobile-menu" isOpen={isOpen} onClose={closeMenu}>
        {/* Nav Items */}
        <div className="flex flex-col gap-1 py-1">
          {currentNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={closeMenu}
              isMobile
            />
          ))}
        </div>

        {/* Auth Actions */}
        <div className="pt-2 border-t border-slate-100">
          <AuthActions
            role={role}
            isAuthenticated={isAuthenticated}
            isReady={isReady}
            onLogout={logout}
            onNavigate={closeMenu}
            isMobile
          />
        </div>
      </MobileMenu>
    </header>
  );
}
