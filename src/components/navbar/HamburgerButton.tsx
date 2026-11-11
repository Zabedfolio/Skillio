'use client';

export interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
}

/**
 * Component: HamburgerButton
 * 44x44px accessible touch target with an animated inline SVG
 * transitioning smoothly between a 3-line hamburger and an 'X' close icon.
 */
export default function HamburgerButton({
  isOpen,
  onClick,
  controlsId,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Top bar */}
        <line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          className={`transition-all duration-300 origin-[12px_12px] ${
            isOpen ? 'rotate-45 translate-y-[6px]' : ''
          }`}
        />
        {/* Middle bar */}
        <line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          className={`transition-opacity duration-200 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Bottom bar */}
        <line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          className={`transition-all duration-300 origin-[12px_12px] ${
            isOpen ? '-rotate-45 -translate-y-[6px]' : ''
          }`}
        />
      </svg>
    </button>
  );
}

