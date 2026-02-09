export default function Loading() {
  return (
    <main className="p-10 max-w-3xl mx-auto">
      <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mt-2" />
      <div className="h-24 w-full bg-gray-200 rounded animate-pulse mt-4" />
      <div className="space-y-2 mt-6">
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-64 w-full bg-gray-200 rounded animate-pulse mt-8" />
    </main>
  );
}
