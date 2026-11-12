'use client';

import { useState } from 'react';

interface CourseThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Component: CourseThumbnail
 * Renders a lazy-loaded course thumbnail with an automatic fallback block on load error.
 *
 * NOTE: Standard <img> is used here instead of next/image because course thumbnail URLs
 * are created dynamically by administrators and can originate from arbitrary remote domains
 * without pre-configured next.config.ts remotePatterns.
 */
export default function CourseThumbnail({
  src,
  alt,
  className = '',
}: CourseThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-primary-light via-white to-accent/20 flex flex-col items-center justify-center text-primary/70 p-4 ${className}`}
        aria-label={`${alt} placeholder`}
      >
        <svg
          className="w-12 h-12 text-primary/60 mb-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M10 10l5 3-5 3v-6Z" fill="currentColor" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase text-primary/80">
          Course Preview
        </span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  );
}

