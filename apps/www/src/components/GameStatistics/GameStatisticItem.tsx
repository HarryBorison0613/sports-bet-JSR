import cx from 'classnames'

export interface IGameStatisticItemProps {
  label: string
  homeScore?: number
  awayScore?: number
  formatLabel?: (value?: any) => string
}

const GameStatisticItem: React.FC<IGameStatisticItemProps> = ({
  label,
  homeScore,
  awayScore,
  formatLabel,
}) => {
  if (!homeScore && !awayScore) {
    return <></>
  }

  return (
    <div
      className={cx(
        'capitalize py-[0.6rem] border-b last-of-type:border-0 hover:bg-slate-50 cursor-pointer px-2',
        'grid grid-cols-12 items-center gap-4 text-sm'
      )}
    >
      <div className={cx('col-span-3 text-center')}>
        <span
          className={cx({
            'bg-green-200 px-2 rounded-xl': homeScore! > awayScore!,
          })}
        >
          {formatLabel ? formatLabel(homeScore) : homeScore}
        </span>
      </div>

      <div className="col-span-6 text-center">{label}</div>

      <div className={cx('col-span-3 text-center')}>
        <span
          className={cx({
            'bg-blue-200 px-2 rounded-xl': awayScore! > homeScore!,
          })}
        >
          {formatLabel ? formatLabel(awayScore) : awayScore}
        </span>
      </div>
    </div>
  )
}

export default GameStatisticItem
