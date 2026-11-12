import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseById, getCourseLectures } from '@/services/courseService';
import CourseThumbnail from '@/components/courses/CourseThumbnail';
import { formatPrice } from '@/lib/formatPrice';

interface CourseDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: 'Course Not Found | Skillio',
      description: 'The requested course does not exist on Skillio.',
    };
  }

  return {
    title: `${course.title} | Skillio`,
    description: course.description,
  };
}

/**
 * Page: CourseDetailsPage (/courses/[id])
 * Detailed course syllabus, lecture breakdown, pricing, and video lecture entrypoint.
 */
export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { id } = await params;
  const [course, lectures] = await Promise.all([
    getCourseById(id),
    getCourseLectures(id),
  ]);

  if (!course) {
    notFound();
  }

  const firstLectureId = lectures[0]?._id;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 overflow-hidden">
      {/* Decorative blurred background orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to all courses</span>
          </Link>
        </nav>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Main Info & Curriculum): 8 Cols */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            {/* Hero Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold tracking-wide uppercase">
                  Verified Curriculum
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  Self-Paced
                </span>
                <span className="text-xs text-slate-500">
                  {lectures.length} {lectures.length === 1 ? 'Lecture' : 'Lectures'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {course.description}
              </p>

              {/* Highlights Pill Grid */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Video Content</span>
                    <span className="text-sm font-bold text-slate-800">{lectures.length} HD Lessons</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Pace</span>
                    <span className="text-sm font-bold text-slate-800">Learn Anytime</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Access</span>
                    <span className="text-sm font-bold text-slate-800">Lifetime Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>What you will learn</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Build real-world production projects from scratch</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Master architectural design patterns & clean code</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Debug, optimize, and deploy with confidence</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Industry-standard tools and modern best practices</span>
                </div>
              </div>
            </div>

            {/* Course Curriculum & Lectures */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Course Curriculum
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {lectures.length} video {lectures.length === 1 ? 'lesson' : 'lessons'} available to watch
                  </p>
                </div>
                {firstLectureId && (
                  <Link
                    href={`/courses/${id}/lectures/${firstLectureId}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Start from beginning</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>

              {lectures.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-sm font-medium text-slate-600">
                    Lectures for this course are being prepared. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {lectures.map((lecture, index) => (
                    <Link
                      key={lecture._id}
                      href={`/courses/${id}/lectures/${lecture._id}`}
                      className="group flex items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200/70 bg-white hover:border-primary/50 hover:shadow-md hover:bg-slate-50/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        {/* Lecture Number Badge */}
                        <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-primary-light text-slate-600 group-hover:text-primary font-bold text-xs flex items-center justify-center shrink-0 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Title and Short Description */}
                        <div className="flex flex-col min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                            {lecture.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {lecture.description}
                          </p>
                        </div>
                      </div>

                      {/* Play Action Badge */}
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 group-hover:text-primary transition-colors">
                          Watch
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-2xs">
                          <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Sticky Enrollment & Preview Card): 4 Cols */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-7">
              {/* Thumbnail with 16:9 Aspect Ratio */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-sm border border-slate-100 mb-6">
                <CourseThumbnail src={course.thumbnailUrl} alt={course.title} />
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Course Price
                </span>
                <span className="text-3xl font-extrabold text-primary">
                  {formatPrice(course.price)}
                </span>
              </div>

              {/* Primary Action Button */}
              {firstLectureId ? (
                <Link
                  href={`/courses/${id}/lectures/${firstLectureId}`}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Start Watching Lectures</span>
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-slate-400 bg-slate-100 cursor-not-allowed"
                >
                  Lectures Coming Soon
                </button>
              )}

              {/* Feature Checklist */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Instant access to all {lectures.length} video lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% self-paced learning on any device</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Lifetime access to course updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

