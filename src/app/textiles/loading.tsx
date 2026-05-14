
import React from 'react';

export default function TextilesLoading() {
  return (
    <div className="bg-white min-h-screen pt-24 lg:pt-[140px] animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative h-[85vh] min-h-[650px] bg-gray-100 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-32 h-full flex flex-col justify-center items-start">
          <div className="w-32 h-6 bg-gray-200 rounded mb-6" />
          <div className="w-2/3 h-20 bg-gray-200 rounded mb-4" />
          <div className="w-1/2 h-16 bg-gray-200 rounded mb-10" />
          <div className="w-48 h-12 bg-gray-200 rounded" />
        </div>
      </section>

      {/* Value Pillars Skeleton */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1700px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="w-24 h-3 bg-gray-200 rounded" />
                <div className="w-16 h-2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid Skeleton */}
      <section className="py-24 max-w-[1700px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <div className="h-8 w-1/2 bg-gray-200 rounded" />
              <div className="aspect-[4/5] bg-gray-100 rounded-3xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
