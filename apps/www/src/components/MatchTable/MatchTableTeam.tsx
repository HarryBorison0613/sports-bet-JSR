import type { ITeam } from 'src/interface'
import Image from '@app/image'
import cx from 'classnames'

export const MatchTableTeam: React.FC<{ team: ITeam }> = ({ team }) => {
  return (
    <div
      className={cx(
        'col-span-5 flex items-center justify-end gap-2 font-medium',
        'last-of-type:flex-row-reverse'
      )}
      title={team?.name}
    >
      <div className="truncate">{team?.name}</div>
      {team?.icon && (
        <Image src={team?.icon} alt={team?.name} width={26} height={26} />
      )}
    </div>
  )
}
