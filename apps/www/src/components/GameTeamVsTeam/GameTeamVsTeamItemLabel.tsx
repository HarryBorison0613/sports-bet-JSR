import Image from '@app/image'
import cx from 'classnames'

export interface IGameTeamVsTeamItemLabelProps {
  label: string
  icon?: string
  winner?: boolean
  matchTie?: boolean
}

export const GameTeamVsTeamItemLabel: React.FC<
  IGameTeamVsTeamItemLabelProps
> = ({ label, icon, winner, matchTie }) => {
  return (
    <div
      className={cx(
        'col-span-5 text-center text-xs flex gap-2 items-center last-of-type:flex-row-reverse',
        'text-red-500',
        {
          'text-green-600 font-semibold': winner,
          '!text-slate-400': matchTie,
        }
      )}
    >
      <span className="flex-1">{label}</span>
      <div className="w-6 aspect-square relative">
        {icon && <Image src={icon} alt={label} width={24} height={24} />}
      </div>
    </div>
  )
}
