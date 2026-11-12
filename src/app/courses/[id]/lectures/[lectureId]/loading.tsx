/**
 * Loading skeleton for the Lecture Player page (/courses/[id]/lectures/[lectureId]).
 * Matches the 2-column video player and sidebar playlist layout.
 */
export default function LectureLoading() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light/40 via-white to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="w-64 h-5 bg-slate-200 rounded-md mb-6" />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Section Skeleton: 8 Cols */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 16:9 Video Skeleton */}
            <div className="w-full aspect-video bg-slate-200 rounded-3xl" />

            {/* Lecture Meta Card Skeleton */}
            <div className="bg-white/95 rounded-3xl border border-slate-200/90 p-6 sm:p-8">
              <div className="w-28 h-6 bg-slate-200 rounded-full mb-3" />
              <div className="w-3/4 h-8 bg-slate-200 rounded-xl mb-6" />
              <div className="w-32 h-4 bg-slate-200 rounded mb-3" />
              <div className="w-full h-4 bg-slate-200 rounded mb-2" />
              <div className="w-4/5 h-4 bg-slate-200 rounded" />
            </div>
          </div>

          {/* Sidebar Playlist Skeleton: 4 Cols */}
          <div className="lg:col-span-4">
            <div className="bg-white/95 rounded-3xl border border-slate-200/90 p-5">
              <div className="w-32 h-6 bg-slate-200 rounded-md mb-4" />
              <div className="flex flex-col gap-3">
                <div className="w-full h-14 bg-slate-200 rounded-2xl" />
                <div className="w-full h-14 bg-slate-200 rounded-2xl" />
                <div className="w-full h-14 bg-slate-200 rounded-2xl" />
                <div className="w-full h-14 bg-slate-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

