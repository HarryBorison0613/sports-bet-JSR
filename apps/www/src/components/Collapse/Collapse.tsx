import Image from '@app/image'
import cx from 'classnames'

export interface ICollapseProps {
  title: string
  icon: string
  action?: React.ReactElement
  open: boolean
  onToggleCollapse?: () => void
}

const Collapse: React.FC<React.PropsWithChildren<ICollapseProps>> = ({
  title,
  icon,
  children,
  action,
  open,
  onToggleCollapse,
}) => {
  return (
    <div
      className={cx('transition-all grid rounded-md hover:bg-gray-100', {
        'border-b last-of-type:border-b-0': !open,
        'bg-blue-50 hover:bg-blue-200': open,
      })}
    >
      <div
        className="flex items-center gap-2 cursor-pointer p-4"
        onClick={onToggleCollapse}
      >
        <Image src={icon} alt={title} width={28} height={28} />

        <div className="flex-1">{title}</div>

        {action}
      </div>

      <div
        className={cx('bg-white opacity-0 transition', {
          'p-4 border-primary border-2 rounded-md opacity-100': open,
        })}
      >
        {open && <>{children}</>}
      </div>
    </div>
  )
}

export default Collapse
