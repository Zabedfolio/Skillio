import Link from 'next/link';
import { Course } from '@/types';
import CourseThumbnail from './CourseThumbnail';
import { formatPrice } from '@/lib/formatPrice';

interface CourseCardProps {
  course: Course;
}

/**
 * Component: CourseCard
 * Individual course card wrapped in a fully clickable, accessible Link.
 * Features 16:9 thumbnail, multi-line clamp, formatted price, and hover micro-interactions.
 */
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course._id}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* 16:9 Thumbnail Container */}
      <div className="aspect-video w-full relative overflow-hidden bg-slate-100">
        <CourseThumbnail src={course.thumbnailUrl} alt={course.title} />
      </div>

      {/* Card Content & Pinned Bottom Row */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Course Title with 2-line clamp */}
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h2>

          {/* Description with 3-line clamp */}
          <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Pinned Bottom Row: Price + Action CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-primary">
              {formatPrice(course.price)}
            </span>
            {typeof course.lectureCount === 'number' && (
              <span className="text-xs text-slate-500 font-medium">
                • {course.lectureCount} {course.lectureCount === 1 ? 'lecture' : 'lectures'}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors">
            <span>View course</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

