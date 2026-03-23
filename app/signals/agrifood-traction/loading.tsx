export default function TractionLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6 animate-pulse">
      <div className="mb-8">
        <div className="mb-2 h-4 w-36 rounded bg-nucleus-surface" />
        <div className="h-9 w-96 rounded bg-nucleus-surface" />
        <div className="mt-2 h-4 w-80 rounded bg-nucleus-surface" />
      </div>
      {/* Benchmark cards skeleton */}
      <div className="mb-10">
        <div className="mb-4 h-6 w-56 rounded bg-nucleus-surface" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-card border border-nucleus-border bg-nucleus-surface"
            />
          ))}
        </div>
      </div>
      {/* Table skeleton */}
      <div className="mb-10">
        <div className="mb-4 h-6 w-48 rounded bg-nucleus-surface" />
        <div className="h-64 rounded-card border border-nucleus-border bg-nucleus-surface" />
      </div>
    </div>
  );
}
