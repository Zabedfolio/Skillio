import type { Metadata } from 'next';
import { getCourses } from '@/services/courseService';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { CourseGrid } from '@/components/courses';

export const metadata: Metadata = {
  title: 'Courses | Skillio',
  description: 'Explore comprehensive, hands-on courses designed for future-ready software engineers.',
};

/**
 * Page: CoursesPage (Server Component)
 * Dynamically fetches live courses directly from the backend API.
 * Never displays hardcoded courses, and gracefully handles empty and error states.
 */
export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 overflow-hidden">
      {/* Decorative blurred ambient circles */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header with optional course count pill */}
        <PageHeader courseCount={courses.length} />

        {/* Content: Either responsive course grid or friendly empty state */}
        {courses.length === 0 ? (
          <EmptyState
            title="No courses yet"
            message="Check back soon. New courses are on the way."
          />
        ) : (
          <CourseGrid courses={courses} />
        )}
      </div>
    </main>
  );
}

