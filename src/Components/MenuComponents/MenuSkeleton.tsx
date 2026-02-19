export const MenuSkeleton = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFDFD] pb-44 animate-pulse">
      {/* Navbar Skeleton */}
      <div className="h-20 md:h-24 bg-white border-b border-gray-50 px-4 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-200 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        {/* Bento Offers Skeleton */}
        <div className="grid grid-cols-4 gap-4 h-48 md:h-80 mb-8">
          <div className="col-span-4 md:col-span-2 bg-gray-200 rounded-[2.5rem]" />
          <div className="hidden md:block col-span-1 bg-gray-100 rounded-[2.5rem]" />
          <div className="hidden md:block col-span-1 bg-gray-100 rounded-[2.5rem]" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-3 mb-10 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-20 bg-gray-200 rounded-full shrink-0"
            />
          ))}
        </div>

        {/* Grid Section */}
        <section>
          <div className="h-8 w-40 bg-gray-200 rounded-lg mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-2 md:p-3 border border-gray-50"
              >
                <div className="h-32 md:h-56 bg-gray-200 rounded-[1.2rem] md:rounded-[2rem] mb-4" />
                <div className="px-2 space-y-3">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded md:block hidden" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="space-y-1">
                      <div className="h-2 w-8 bg-gray-100 rounded" />
                      <div className="h-5 w-12 bg-gray-200 rounded" />
                    </div>
                    <div className="w-8 h-8 md:w-14 md:h-14 bg-gray-200 rounded-xl md:rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
