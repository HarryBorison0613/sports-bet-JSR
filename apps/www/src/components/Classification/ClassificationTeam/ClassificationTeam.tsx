import Image from '@app/image'
import cx from 'classnames'
import styles from './ClassificationTeam.module.css'

export interface IClassificationTeamProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  name: string
  icon?: string
  size?: 'small' | 'medium'
}

const getSize = (size?: any) => {
  switch (size) {
    case 'small':
      return 18
    case 'medium':
      return 26
    default:
      return 24
  }
}

const ClassificationTeam: React.FC<IClassificationTeamProps> = ({
  name,
  icon,
  className,
  size,
  ...restProps
}) => {
  return (
    <div {...restProps} className={cx(styles.base, className)}>
      <Image
        src={icon!}
        alt={name}
        width={getSize(size)}
        height={getSize(size)}
      />
      <span>{name}</span>
    </div>
  )
}

export default ClassificationTeam
