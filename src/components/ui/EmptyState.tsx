interface EmptyStateProps {
  title?: string;
  message?: string;
}

/**
 * Component: EmptyState
 * Accessible placeholder displayed when zero courses exist in the catalog.
 */
export default function EmptyState({
  title = 'No courses yet',
  message = 'Check back soon. New courses are on the way.',
}: EmptyStateProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center py-16 px-6 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-sm mt-8">
      {/* Decorative Book/Graduation Icon */}
      <div
        className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light flex items-center justify-center text-primary border border-primary/20 shadow-2xs"
        aria-hidden="true"
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{message}</p>
    </div>
  );
}

