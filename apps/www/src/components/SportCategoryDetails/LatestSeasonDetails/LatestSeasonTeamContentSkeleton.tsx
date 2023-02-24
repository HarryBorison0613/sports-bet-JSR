export const LatestSeasonTeamContentSkeleton = () => (
  <div className="grid gap-4 animate-pulse">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="h-[48px] rounded-md bg-slate-200"></div>
    ))}
  </div>
)
