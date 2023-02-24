import cx from 'classnames'

export interface IClassificationStreakProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  streak: string[]
  size?: 'small'
}

const ClassificationStreak: React.FC<IClassificationStreakProps> = ({
  streak,
  className,
  size,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={cx(
        'flex items-center justify-center gap-[0.4rem]',
        {
          'gap-[0.3rem]': size === 'small',
        },
        className
      )}
    >
      {streak.map((item, index) => (
        <div
          key={index}
          className={cx(
            'w-[18px] aspect-square rounded-full grid place-content-center bg-slate-200 text-slate-400',
            'text-[0.58rem]',
            {
              'w-[15px] text-[0.55rem]': size === 'small',
            },
            {
              'bg-green-500 !text-white': item === 'W',
              'bg-red-500 !text-white': item === 'L',
              'bg-gray-300 !text-slate-700': item === 'D',
            }
          )}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default ClassificationStreak
