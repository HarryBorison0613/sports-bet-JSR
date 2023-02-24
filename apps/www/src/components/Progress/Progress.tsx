import cx from 'classnames'

export interface IProgressProps {
  progress: number
  descriptionLeft?: string
  descriptionRight?: string
  className?: string
  progressColor?: string
}

export type IProgressComponent = React.FC<IProgressProps> & {
  Skeleton: React.FC
}

export const ProgressSkeleton = () => {
  return (
    <div className="grid gap-2 mt-5">
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-slate-200 h-2 rounded-full"
          style={{ width: `100%` }}
        ></div>
      </div>
      <div className="flex justify-between text-primary-500 capitalize">
        <small className="w-2/12 h-[10px] rounded-md bg-slate-200"></small>
        <small className="w-2/12 h-[10px] rounded-md bg-slate-200"></small>
      </div>
    </div>
  )
}

const Progress: IProgressComponent = ({
  progress,
  descriptionLeft,
  descriptionRight,
  className,
  progressColor,
}) => {
  return (
    <div className={cx('grid gap-2 mt-5', className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full"
          style={{ width: `${progress}%`, background: progressColor }}
        ></div>
      </div>
      {(descriptionLeft || descriptionRight) && (
        <div className="flex justify-between text-primary-500 capitalize">
          <small>{descriptionLeft}</small>
          <small>{descriptionRight}</small>
        </div>
      )}
    </div>
  )
}

Progress.Skeleton = ProgressSkeleton

export default Progress
