export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-800 border-t-transparent"></div>
    </div>
  );
}

// Minimal skeleton loader for sections
export function SectionSkeleton() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="space-y-4">
          <div className="h-4 bg-stone-200 rounded w-1/4 mx-auto"></div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="h-24 bg-stone-100 rounded"></div>
            <div className="h-24 bg-stone-100 rounded"></div>
            <div className="h-24 bg-stone-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
