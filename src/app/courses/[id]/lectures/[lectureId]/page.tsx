import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCourseById,
  getCourseLectures,
  getLectureById,
} from '@/services/courseService';
import { getEmbedUrl } from '@/lib/videoUtils';

interface LectureViewerPageProps {
  params: Promise<{ id: string; lectureId: string }>;
}

export async function generateMetadata({
  params,
}: LectureViewerPageProps): Promise<Metadata> {
  const { id, lectureId } = await params;
  const [course, lecture] = await Promise.all([
    getCourseById(id),
    getLectureById(lectureId),
  ]);

  if (!course || !lecture) {
    return {
      title: 'Lecture Not Found | Skillio',
    };
  }

  return {
    title: `${lecture.title} | ${course.title} | Skillio`,
    description: lecture.description,
  };
}

/**
 * Page: LectureViewerPage (/courses/[id]/lectures/[lectureId])
 * Embedded video player with responsive player, lecture notes, and sidebar playlist.
 */
export default async function LectureViewerPage({
  params,
}: LectureViewerPageProps) {
  const { id, lectureId } = await params;
  const [course, lectures, currentLecture] = await Promise.all([
    getCourseById(id),
    getCourseLectures(id),
    getLectureById(lectureId),
  ]);

  if (!course || !currentLecture) {
    notFound();
  }

  // Find currentIndex in lectures list for Next / Prev navigation
  const currentIndex = lectures.findIndex((l) => l._id === lectureId);
  const prevLecture = currentIndex > 0 ? lectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex >= 0 && currentIndex < lectures.length - 1
      ? lectures[currentIndex + 1]
      : null;

  const embedUrl = getEmbedUrl(currentLecture.videoUrl);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light/40 via-white to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <Link
            href="/courses"
            className="text-slate-500 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Courses
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            href={`/courses/${id}`}
            className="text-slate-500 hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            {course.title}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-xs">
            {currentLecture.title}
          </span>
        </nav>

        {/* 2-Column Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Section: 8 Cols */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 16:9 Video Embed Player */}
            <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10 relative">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={currentLecture.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/70 p-6 text-center">
                  <svg className="w-12 h-12 mb-3 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="text-sm font-medium">Video URL is being updated.</p>
                </div>
              )}
            </div>

            {/* Lecture Meta & Navigation Controls */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold tracking-wide uppercase">
                    Lesson {currentIndex >= 0 ? currentIndex + 1 : 1} of {lectures.length}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    {currentLecture.title}
                  </h1>
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {prevLecture ? (
                    <Link
                      href={`/courses/${id}/lectures/${prevLecture._id}`}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-primary/40 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      <span>Previous</span>
                    </Link>
                  ) : null}

                  {nextLecture ? (
                    <Link
                      href={`/courses/${id}/lectures/${nextLecture._id}`}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs hover:shadow-md hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span>Next</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${id}`}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs hover:bg-emerald-700 transition-colors"
                    >
                      <span>Complete Course</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Lecture Description / Notes */}
              <div className="pt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Lesson Overview & Notes
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {currentLecture.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Playlist: 4 Cols */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Course Playlist</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lectures.length} {lectures.length === 1 ? 'lesson' : 'lessons'} in total
                  </p>
                </div>
                <Link
                  href={`/courses/${id}`}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Overview
                </Link>
              </div>

              {/* Playlist Items */}
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto divide-y divide-slate-100 p-2">
                {lectures.map((item, idx) => {
                  const isActive = item._id === lectureId;
                  return (
                    <Link
                      key={item._id}
                      href={`/courses/${id}/lectures/${item._id}`}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-primary-light/70 text-primary border border-primary/20 shadow-2xs font-medium'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isActive ? (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        ) : (
                          String(idx + 1).padStart(2, '0')
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className={`text-xs sm:text-sm line-clamp-2 ${isActive ? 'font-bold text-primary' : 'font-medium text-slate-900'}`}>
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

