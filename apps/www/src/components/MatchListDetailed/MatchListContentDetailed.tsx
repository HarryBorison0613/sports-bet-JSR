import React from 'react'
import type { IGameSummary } from 'src/interface'
import MatchListItemDetailed from './MatchListItemDetailed'
import MatchListItem from '../MatchList/MatchListItem'

export interface IMatchListContentProps {
  games: IGameSummary[]
}

const MatchListContent: React.FC<IMatchListContentProps> = ({ games }) => {
  const screenSize = screen.width

  return (
    <>
      {games?.map((summary) => (
        screenSize >= 1024 ?
        <MatchListItemDetailed summary={summary} key={summary?.sport_event?.id} />
        : <MatchListItem summary={summary} key={summary?.sport_event?.id} />
      ))}

    </>
  )
}

export default React.memo(MatchListContent)
