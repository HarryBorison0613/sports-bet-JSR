export const SkeletonProfile = () => (
  <div className="p-6 lg:border-r border-b flex items-center gap-2">
    <div className="w-[42px] aspect-square bg-slate-200 rounded-full" />
    <div className="flex-1">
      <div className="h-[14px] rounded-md bg-slate-200 mb-2" />
      <div className="h-[10px] rounded-md bg-slate-200 w-6/12" />
    </div>
  </div>
)
