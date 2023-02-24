import React from 'react'
import { ISportEventStatus, ISportEventSummary } from 'src/interface'
import Card from 'src/components/Card/Card'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { IMatchTable } from './MatchTable'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import cx from 'classnames'
import { MatchTableTeam } from './MatchTableTeam'
import Link from '@app/link'
import MatchTableItem from './MatchTableItem'

export interface IMatchTableContentProps extends IMatchTable {
  summaries: ISportEventSummary[]
}

export const MatchTableContent: React.FC<IMatchTableContentProps> = ({
  summaries,
  ...restProps
}) => {
  // const { push, createGamePageHref, query } = useGlobalContext()

  const { paginatedData, completed, nextPage } = usePaginatedData(summaries)

  const { createGameHref, push } = useCreateHref()

  const getScoreText = React.useCallback((event: ISportEventSummary) => {
    if (
      event?.sport_event_status?.match_status !== 'ended' &&
      event?.sport_event_status?.status !== 'live'
    ) {
      return <>vs</>
    }

    return (
      <>
        {event?.sport_event_status?.home_score}-
        {event?.sport_event_status?.away_score}
      </>
    )
  }, [])

  return (
    <Card {...restProps} viewMore={!completed} onClickViewMore={nextPage}>
      <div className="grid gap-4  p-4 px-2 lg:p-0 lg:gap-0">
        {paginatedData?.map((event) => (
          <MatchTableItem
            key={event?.sport_event?.id}
            href={createGameHref(event?.sport_event)}
            event={event}
            scoreText={getScoreText(event)}
          />
        ))}
      </div>
    </Card>
  )
}
