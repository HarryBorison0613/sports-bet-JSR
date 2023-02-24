const MatchListSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="col-span-12 flex items-center justify-between bg-white p-4 lg:rounded-md shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-[42px] aspect-square bg-slate-300 rounded-md" />
            <div className="h-[14px] w-[80px] bg-slate-300 rounded-md" />
          </div>

          <div className="h-[24px] w-[40px] bg-slate-300 rounded-md" />

          <div className="flex items-center gap-2">
            <div className="h-[14px] w-[80px] bg-slate-300 rounded-md" />
            <div className="w-[42px] aspect-square bg-slate-300 rounded-md" />
          </div>
        </div>
      ))}
    </>
  )
}

export default MatchListSkeleton
