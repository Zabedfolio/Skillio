/**
 * Component: CourseCardSkeleton
 * Skeleton placeholder matching the exact dimensions and layout of CourseCard.
 */
export default function CourseCardSkeleton() {
  return (
    <div
      className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Thumbnail Skeleton */}
      <div className="aspect-video w-full bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Title Placeholder */}
          <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-2" />
          <div className="h-5 bg-slate-200 rounded-md w-1/2" />

          {/* Description Placeholder */}
          <div className="space-y-2 mt-4">
            <div className="h-3.5 bg-slate-150 rounded w-full bg-slate-200/70" />
            <div className="h-3.5 bg-slate-150 rounded w-5/6 bg-slate-200/70" />
            <div className="h-3.5 bg-slate-150 rounded w-2/3 bg-slate-200/70" />
          </div>
        </div>

        {/* Bottom Row Placeholder */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

