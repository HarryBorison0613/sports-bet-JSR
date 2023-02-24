import React from 'react'
import type { IGameSummary } from 'src/interface'
import MatchListItem from './MatchListItem'

export interface IMatchListContentProps {
  games: IGameSummary[]
}

const MatchListContent: React.FC<IMatchListContentProps> = ({ games }) => {
  // const { paginatedData, completed, nextPage } = usePaginatedData(games)

  return (
    <>
      {games?.map((summary) => (
        <MatchListItem summary={summary} key={summary?.sport_event?.id} />
      ))}

      {/* {!completed ? (
        <div
          className="p-4 text-center capitalize cursor-pointer hover:text-primary-500 hover:font-bold hover:bg-blue-100"
          onClick={nextPage}
        >
          Veja mais
        </div>
      ) : null} */}
    </>
  )
}

export default React.memo(MatchListContent)
