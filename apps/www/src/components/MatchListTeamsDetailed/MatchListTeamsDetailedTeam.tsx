import Image from '@app/image'
import React from 'react'


const GameMainContentTeam = (team: any) => {
  const teamIcon = team?.team.icon;

  return (
      <a className="w-[60px] lg:w-[100px] 2xl:w-[128px] grid gap-2 place-items-center text-center text-sm font-semibold hover:text-primary-500 cursor-pointer">
        {teamIcon && (
          <Image src={teamIcon} alt={team?.team.name} width={80} height={80} key={team?.team.name}/>
        )}

        <div>{team?.team.name}</div>
      </a>
  )
}

export default GameMainContentTeam
