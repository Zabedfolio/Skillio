'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCourses, deleteCourse } from '@/services/courseService';
import CourseThumbnail from '@/components/courses/CourseThumbnail';
import { formatPrice } from '@/lib/formatPrice';
import { Course } from '@/types';
import toast from 'react-hot-toast';

/**
 * Page: AdminCoursesPage (/admin/courses)
 * Lists all courses with interactive editing, lecture navigation, and deletion.
 */
export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await getCourses();
        if (!ignore) {
          setCourses(data);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error('Failed to load courses.');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    try {
      setIsDeleting(true);
      await deleteCourse(courseToDelete._id);
      setIsDeleting(false);
      toast.success(`"${courseToDelete.title}" and its lectures were deleted.`);
      setCourseToDelete(null);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setIsDeleting(false);
      const msg = err instanceof Error ? err.message : 'Failed to delete course.';
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Catalog Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Courses
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Create, update, and manage all courses in your curriculum ({courses.length} total)
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Courses List Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900">No courses yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              Get started by adding your first course to the platform.
            </p>
            <Link
              href="/admin/courses/new"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>Create Course</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Course Info</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Lectures</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-6 py-4 w-32">
                      <div className="w-24 aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xs">
                        <CourseThumbnail src={course.thumbnailUrl} alt={course.title} />
                      </div>
                    </td>

                    {/* Title & Description */}
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm line-clamp-1">
                          {course.title}
                        </span>
                        <span className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {course.description}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-extrabold text-primary text-sm">
                        {formatPrice(course.price)}
                      </span>
                    </td>

                    {/* Lectures Count Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/courses/${course._id}/lectures`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>
                          {course.lectureCount ?? 0} {course.lectureCount === 1 ? 'Lecture' : 'Lectures'}
                        </span>
                      </Link>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/courses/${course._id}/lectures`}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-primary-light text-slate-700 hover:text-primary text-xs font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          <span>Manage</span>
                        </Link>
                        <Link
                          href={`/admin/courses/${course._id}/edit`}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setCourseToDelete(course)}
                          className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {courseToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scaleIn">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Delete Course?
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{courseToDelete.title}&quot;</strong>?
              This action will also <strong className="text-red-600">permanently delete all linked lectures</strong> via cascade delete.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setCourseToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Course & Lectures</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
