import PageHeader from '@/components/ui/PageHeader';
import { CourseCardSkeleton } from '@/components/courses';

/**
 * Loading boundary for /courses route.
 * Renders the hero header and a grid of 6 card skeletons to prevent layout shift.
 */
export default function CoursesLoading() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 overflow-hidden">
      {/* Decorative blurred background circles */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <PageHeader />

        {/* Skeleton Grid */}
        <div
          role="status"
          aria-label="Loading courses"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

