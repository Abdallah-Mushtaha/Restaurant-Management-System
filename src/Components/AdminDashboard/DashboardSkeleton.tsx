export const DashboardSkeleton = () => (
  <div className="h-full flex flex-col space-y-6 animate-pulse p-1">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-[1.5rem]" />
      ))}
    </div>
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gray-100 rounded-[2rem]" />
      <div className="bg-gray-800 rounded-[2rem]" />
    </div>
  </div>
);
