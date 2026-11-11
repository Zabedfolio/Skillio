'use client';

import React from 'react';

export interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Component: MobileMenu
 * Accessible slide-down drawer panel for viewports below the `lg` breakpoint.
 * Features structured sections with comfortable touch targets and glassmorphism styling.
 */
export default function MobileMenu({
  id,
  isOpen,
  children,
}: MobileMenuProps) {
  return (
    <div
      id={id}
      aria-hidden={!isOpen}
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-md border-b border-slate-200/80 shadow-lg ${
        isOpen
          ? 'max-h-[32rem] opacity-100 visible py-5'
          : 'max-h-0 opacity-0 invisible py-0 border-transparent pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
