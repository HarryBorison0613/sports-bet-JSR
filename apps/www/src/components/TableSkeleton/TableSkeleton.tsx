const TableSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-[48px] border-b flex items-center px-4 last-of-type:border-0"
        >
          <div className="bg-slate-300 h-[14px] flex-1 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton
