'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getCourseById,
  getCourseLectures,
  createLecture,
  updateLecture,
  deleteLecture,
} from '@/services/courseService';
import { getEmbedUrl } from '@/lib/videoUtils';
import CourseThumbnail from '@/components/courses/CourseThumbnail';
import { Course, Lecture } from '@/types';
import toast from 'react-hot-toast';

interface LectureManagerPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Page: LectureManagerPage (/admin/courses/[id]/lectures)
 * Add, edit, and delete lectures for a specific course.
 */
export default function LectureManagerPage({ params }: LectureManagerPageProps) {
  const { id } = use(params);

  const [course, setCourse] = useState<Course | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal / Form States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const [c, l] = await Promise.all([getCourseById(id), getCourseLectures(id)]);
        if (!ignore) {
          setCourse(c);
          setLectures(l);
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          toast.error('Failed to load course lectures.');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id, refreshKey]);

  const openAddModal = () => {
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setEditingLecture(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (lec: Lecture) => {
    setEditingLecture(lec);
    setTitle(lec.title);
    setDescription(lec.description);
    setVideoUrl(lec.videoUrl);
    setIsAddModalOpen(true);
  };

  const handleQuickFill = () => {
    const lectureNum = lectures.length + 1;
    setTitle(`${lectureNum}. Advanced Full-Stack Architecture & Microservices`);
    setDescription(
      'Deep dive into state management, server streaming, security headers, and distributed database connections.'
    );
    setVideoUrl('https://www.youtube.com/watch?v=wm5gMKuwSYk');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !videoUrl.trim()) {
      toast.error('Please complete all lecture fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingLecture) {
        await updateLecture(editingLecture._id, {
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl.trim(),
        });
        toast.success('Lecture updated successfully!');
      } else {
        await createLecture(id, {
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl.trim(),
        });
        toast.success('Lecture added to course!');
      }
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Failed to save lecture.';
      toast.error(msg);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!lectureToDelete) return;

    try {
      setIsSubmitting(true);
      await deleteLecture(lectureToDelete._id);
      setIsSubmitting(false);
      toast.success('Lecture deleted.');
      setLectureToDelete(null);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Failed to delete lecture.';
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading course lectures...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Course Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The course you are looking for does not exist.</p>
        <Link href="/admin/courses" className="text-xs font-semibold text-primary underline">
          Return to Courses
        </Link>
      </div>
    );
  }

  const embedUrlPreview = getEmbedUrl(videoUrl);

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to all courses</span>
        </Link>
      </div>

      {/* Selected Course Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-24 sm:w-28 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <CourseThumbnail src={course.thumbnailUrl} alt={course.title} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Lecture Manager
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {course.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {lectures.length} video {lectures.length === 1 ? 'lecture' : 'lectures'} published
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href={`/courses/${id}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
          >
            Preview Course
          </Link>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-primary to-accent shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Lecture</span>
          </button>
        </div>
      </div>

      {/* Lectures List Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Course Video Curriculum</h2>
          <span className="text-xs font-semibold text-slate-500">
            {lectures.length} {lectures.length === 1 ? 'lesson' : 'lessons'}
          </span>
        </div>

        {lectures.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900">No lectures yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              Add video lessons so students can start learning this course.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition-colors inline-flex items-center gap-1.5"
            >
              <span>Add First Lecture</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {lectures.map((lec, index) => (
              <div
                key={lec._id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                      {lec.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {lec.description}
                    </p>
                    <a
                      href={lec.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-primary hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="truncate max-w-xs">{lec.videoUrl}</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Link
                    href={`/courses/${id}/lectures/${lec._id}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Watch</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEditModal(lec)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setLectureToDelete(lec)}
                    className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Lecture Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8 animate-scaleIn">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingLecture ? 'Edit Lecture' : 'Add New Lecture'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Attached to: &quot;{course.title}&quot;
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Autofill helper button */}
              {!editingLecture && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Autofill Sample Lecture
                  </button>
                </div>
              )}

              {/* Title */}
              <div>
                <label
                  htmlFor="lecture-title"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Lecture Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lecture-title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1. Architecture Fundamentals"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="lecture-description"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Description / Lesson Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="lecture-description"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core topics covered in this lesson..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all leading-relaxed"
                />
              </div>

              {/* Video URL */}
              <div>
                <label
                  htmlFor="lecture-video"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  YouTube Video URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="lecture-video"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-white transition-all"
                />
              </div>

              {/* Live Video Embed Preview */}
              {embedUrlPreview && (
                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Live Video Preview
                  </span>
                  <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-sm">
                    <iframe
                      src={embedUrlPreview}
                      title="Lecture Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-primary to-accent shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingLecture ? 'Update Lecture' : 'Add Lecture'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Lecture Modal */}
      {lectureToDelete && (
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
              Delete Lecture?
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{lectureToDelete.title}&quot;</strong>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setLectureToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Lecture</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
