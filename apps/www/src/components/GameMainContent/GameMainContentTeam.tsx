import Image from '@app/image'
import React from 'react'
import type { ITeam } from 'src/interface'

export interface IGameMainContentTeamProps {
  team: ITeam
}

const GameMainContentTeam: React.ForwardRefRenderFunction<
  any,
  IGameMainContentTeamProps
> = ({ team, ...restProps }, ref) => {
  return (
    <a
      className="w-[80px] lg:w-[128px] grid gap-2 place-items-center text-center text-sm font-semibold hover:text-primary-500 cursor-pointer"
      ref={ref}
      {...restProps}
    >
      {team?.icon && (
        <Image src={team?.icon} alt={team?.name} width={80} height={80} />
      )}

      <div>{team?.name}</div>
    </a>
  )
}

export default React.forwardRef(GameMainContentTeam)
