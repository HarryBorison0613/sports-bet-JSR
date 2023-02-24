import DatePicker from 'src/components/DatePicker/DatePicker'
import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import cx from 'classnames'

const MatchListDatePicker: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const {
    selectedDate,
    onSelectDate,
    matchListFilters,
    activeFilter,
    setActiveFilter,
  } = useMatchListContext()

  return (
    <div className={cx('lg:space-y-2 flex-1', className)}>
      <DatePicker value={selectedDate} onChange={onSelectDate} />

      <div className="grid grid-cols-2 gap-0">
        {matchListFilters?.map((item) => (
          <div
            key={item?.id}
            className={cx(
              'text-center px-2 py-1 flex-1 cursor-pointer',
              'border !border-slate-200',
              'text-sm capitalize',
              'first-of-type:rounded-l last-of-type:rounded-r',
              {
                'bg-primary-500 text-white': activeFilter?.id === item?.id,
              }
            )}
            onClick={() => setActiveFilter(item)}
          >
            {item?.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchListDatePicker
