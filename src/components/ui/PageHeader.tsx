interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  courseCount?: number;
}

/**
 * Component: PageHeader
 * Centered hero heading for course listing with responsive typography,
 * gradient accent text, and optional course count pill.
 */
export default function PageHeader({
  title,
  subtitle = 'Browse our courses and start watching lectures today.',
  courseCount,
}: PageHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
      {/* Main H1 Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title ? (
          title
        ) : (
          <>
            Learn new skills, at{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              your own pace
            </span>
          </>
        )}
      </h1>

      {/* Subheadline */}
      <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
        {subtitle}
      </p>

      {/* Optional Course Count Badge */}
      {typeof courseCount === 'number' && courseCount > 0 && (
        <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold border border-primary/20 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>
            {courseCount} {courseCount === 1 ? 'course' : 'courses'} available
          </span>
        </div>
      )}
    </div>
  );
}

