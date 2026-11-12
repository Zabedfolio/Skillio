/**
 * Loading skeleton for the Course Details page (/courses/[id]).
 * Mirrors the exact 2-column layout to prevent layout shifts.
 */
export default function CourseDetailsLoading() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-white to-accent/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
        {/* Back Link Skeleton */}
        <div className="w-36 h-5 bg-slate-200 rounded-md mb-6" />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            {/* Main Header Card Skeleton */}
            <div className="bg-white/90 rounded-3xl border border-slate-200/90 p-6 sm:p-8">
              <div className="flex gap-2 mb-4">
                <div className="w-28 h-6 bg-slate-200 rounded-full" />
                <div className="w-20 h-6 bg-slate-200 rounded-full" />
              </div>
              <div className="w-3/4 h-10 bg-slate-200 rounded-xl mb-4" />
              <div className="w-full h-4 bg-slate-200 rounded mb-2" />
              <div className="w-5/6 h-4 bg-slate-200 rounded mb-6" />

              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-10 bg-slate-200 rounded-lg" />
                <div className="h-10 bg-slate-200 rounded-lg" />
                <div className="h-10 bg-slate-200 rounded-lg" />
              </div>
            </div>

            {/* Curriculum Skeleton */}
            <div className="bg-white/90 rounded-3xl border border-slate-200/90 p-6 sm:p-8">
              <div className="w-48 h-7 bg-slate-200 rounded-lg mb-6" />
              <div className="flex flex-col gap-3">
                <div className="w-full h-16 bg-slate-200 rounded-2xl" />
                <div className="w-full h-16 bg-slate-200 rounded-2xl" />
                <div className="w-full h-16 bg-slate-200 rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white/95 rounded-3xl border border-slate-200/90 p-6 sm:p-7">
              <div className="aspect-video w-full bg-slate-200 rounded-2xl mb-6" />
              <div className="w-full h-8 bg-slate-200 rounded-lg mb-6" />
              <div className="w-full h-12 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

