import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Component: Logo
 * Renders the Skillio brand logo linked to the homepage.
 * Note: Visual brand text is omitted per design specification.
 */
export default function Logo({ className = '', onClick }: LogoProps) {
  return (
    <Link
      href="/courses"
      onClick={onClick}
      className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md ${className}`}
      aria-label="Skillio"
    >
      <Image
        src="/skillio.png"
        alt="Skillio"
        width={813}
        height={325}
        priority
        className="h-8 md:h-9 w-auto object-contain"
      />
    </Link>
  );
}

