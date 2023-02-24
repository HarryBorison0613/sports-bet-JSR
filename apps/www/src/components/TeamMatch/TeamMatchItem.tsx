import React from 'react'
import type { ITeam } from 'src/interface'
import Image from '@app/image'

export interface ITeamMatchItemProps {
  team?: ITeam
  isHomeTeam?: boolean
}

const TeamMatchItem: React.ForwardRefRenderFunction<
  any,
  ITeamMatchItemProps
> = ({ team, isHomeTeam, ...restProps }, ref) => {
  return (
    <div className="col-span-5 text-xs text-center font-medium h-full flex flex-col gap-4 justify-between">
      <a
        {...restProps}
        ref={ref}
        className="flex flex-col gap-4 justify-between items-center h-full hover:text-primary-500"
      >
        <div>{team?.name}</div>

        {team?.icon && (
          <Image src={team?.icon} alt={team?.name} width={64} height={64} />
        )}
      </a>

      {/* <FollowButton variant={isHomeTeam ? 'success' : undefined} /> */}
    </div>
  )
}

export default React.forwardRef(TeamMatchItem)
