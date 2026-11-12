'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/services/courseService';
import CourseThumbnail from '@/components/courses/CourseThumbnail';
import toast from 'react-hot-toast';

/**
 * Page: NewCoursePage (/admin/courses/new)
 * Create new course with live thumbnail preview and input validation.
 */
export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('39.99');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickFill = () => {
    setTitle('Full-Stack Next.js 16 & AI Applications');
    setDescription(
      'Learn how to architect, build, and deploy high-performance AI-powered web applications using Next.js 16, TypeScript, Tailwind CSS, and streaming responses.'
    );
    setPrice('49.99');
    setThumbnailUrl(
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
    );
  };

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
      await createCourse({
        title: title.trim(),
        description: description.trim(),
        price: numPrice,
        thumbnailUrl: thumbnailUrl.trim(),
      });
      setIsSubmitting(false);
      toast.success('Course created successfully!');
      router.push('/admin/courses');
      router.refresh();
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Failed to create course.';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header with Back Navigation */}
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

        <button
          type="button"
          onClick={handleQuickFill}
          className="text-xs font-semibold text-primary hover:text-primary-dark underline-offset-4 hover:underline"
        >
          Autofill Sample Course
        </button>
      </div>

      {/* Main Card Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
        <div className="mb-8">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Curriculum Builder
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Create New Course
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Add a course to your public catalog. You can add video lectures after creating the course.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label
              htmlFor="course-title"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="course-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Full-Stack Next.js 16"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="course-description"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="course-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive summary of what students will achieve in this course..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Price and Thumbnail Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Price */}
            <div>
              <label
                htmlFor="course-price"
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
                  id="course-price"
                  required
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1.5 block">
                Set to 0 to offer this course as &quot;Free&quot;.
              </span>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label
                htmlFor="course-thumbnail"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="course-thumbnail"
                required
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
              />
              <span className="text-[11px] text-slate-500 mt-1.5 block">
                High-resolution 16:9 aspect ratio image URL recommended.
              </span>
            </div>
          </div>

          {/* Live Thumbnail Preview */}
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Live Thumbnail Preview
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
                  <span>Saving Course...</span>
                </>
              ) : (
                <span>Publish Course</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

