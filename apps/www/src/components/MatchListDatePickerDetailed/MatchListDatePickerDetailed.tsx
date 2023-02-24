import DatePicker from 'src/components/DatePicker/DatePicker'
import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import cx from 'classnames'
import Calendar from 'react-calendar'

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
    <div className='block mt-4'>
      <div className="lg:hidden">
        <DatePicker value={selectedDate} onChange={onSelectDate} />
      </div>

      <div className="hidden hidden lg:block">
          <Calendar onChange={onSelectDate} value={selectedDate} locale="pt-br" tileClassName="text-sm" />
      </div>

      

      <div className="grid grid-cols-2 gap-0 mt-4">
        {matchListFilters?.map((item) => (
          <div
            key={item?.id}
            className={cx(
              'text-center px-2 py-2 flex-1 cursor-pointer',
              'border !border-slate-200',
              'text-sm capitalize',
              'first-of-type:rounded-l last-of-type:rounded-r',
              
              {
                'bg-red-700 text-white': activeFilter?.id === item?.id,
              },
              {
                'bg-grey-300': activeFilter?.id != item?.id,
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
