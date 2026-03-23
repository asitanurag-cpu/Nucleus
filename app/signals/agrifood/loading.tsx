export default function AgriSignalsLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="mb-2 h-4 w-28 rounded bg-nucleus-surface" />
        <div className="h-9 w-80 rounded bg-nucleus-surface" />
        <div className="mt-2 h-4 w-96 rounded bg-nucleus-surface" />
      </div>
      {/* Watchlist skeleton */}
      <div className="mb-6 h-28 rounded-card border border-nucleus-border bg-nucleus-surface" />
      {/* Cards skeleton */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-card border border-nucleus-border bg-nucleus-surface"
          />
        ))}
      </div>
    </div>
  );
}
