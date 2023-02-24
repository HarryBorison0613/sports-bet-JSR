const SkeletonDescription = () => {
  return (
    <div className="grid gap-3">
      <div className="h-[16px] w-5/12 bg-slate-200 rounded-md"></div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-[12px] bg-slate-200 rounded-md last-of-type:w-4/12"
        ></div>
      ))}
    </div>
  )
}

export default SkeletonDescription
