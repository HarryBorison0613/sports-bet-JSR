export const SkeletonList = () => (
  <>
    {[...Array(8)].map((_, index) => (
      <div key={index} className="py-3 border-b last-of-type:border-b-0">
        <div className="h-[14px] rounded-md bg-slate-200 w-11/12 mx-auto" />
      </div>
    ))}
  </>
)
