'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCourseById, updateCourse } from '@/services/courseService';
import CourseThumbnail from '@/components/courses/CourseThumbnail';
import toast from 'react-hot-toast';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page: EditCoursePage (/admin/courses/[id]/edit)
 * Prepopulates course details and updates them in the database.
 */
export default function EditCoursePage({ params }: EditCoursePageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('0');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const course = await getCourseById(id);
        if (ignore) return;
        if (!course) {
          toast.error('Course not found.');
          router.push('/admin/courses');
          return;
        }
        setTitle(course.title);
        setDescription(course.description);
        setPrice(String(course.price));
        setThumbnailUrl(course.thumbnailUrl);
        setLoading(false);
      } catch {
        if (!ignore) {
          toast.error('Failed to load course details.');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !thumbnailUrl.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      toast.error('Price must be a valid non-negative number.');
      return;
    }

    try {
      setIsSubmitting(true);
      await updateCourse(id, {
        title: title.trim(),
        description: description.trim(),
        price: numPrice,
        thumbnailUrl: thumbnailUrl.trim(),
      });
      setIsSubmitting(false);
      toast.success('Course updated successfully!');
      router.push('/admin/courses');
      router.refresh();
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Failed to update course.';
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to all courses</span>
        </Link>

        <Link
          href={`/admin/courses/${id}/lectures`}
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Manage Course Lectures</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
        <div className="mb-8">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Edit Course
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Update Course Details
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Modify course information, price, and thumbnail.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label
              htmlFor="edit-course-title"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-course-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="edit-course-description"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="edit-course-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Price & Thumbnail Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Price */}
            <div>
              <label
                htmlFor="edit-course-price"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  id="edit-course-price"
                  required
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label
                htmlFor="edit-course-thumbnail"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="edit-course-thumbnail"
                required
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
              />
            </div>
          </div>

          {/* Live Thumbnail Preview */}
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Thumbnail Preview
            </span>
            <div className="w-full max-w-sm aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative shadow-xs">
              <CourseThumbnail
                src={thumbnailUrl}
                alt={title || 'Course Preview'}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/courses"
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg hover:shadow-primary/25 hover:brightness-105 active:scale-[0.98] transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
