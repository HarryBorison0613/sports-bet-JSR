import Image from '@app/image'
import React from 'react'

export interface IMatchTabBarItemTeamInfoProps {
  name: string
  icon: string
  score?: number
}

const MatchTabBarItemTeamInfo: React.FC<IMatchTabBarItemTeamInfoProps> = ({
  name,
  icon,
  score,
}) => {
  return (
    <div className="flex gap-2 items-center text-lg font-bold">
      <Image src={icon} alt={name} width={24} height={24} />
      <span className="flex-1">{name}</span>
      <span>{score}</span>
    </div>
  )
}

export default React.memo(MatchTabBarItemTeamInfo)
