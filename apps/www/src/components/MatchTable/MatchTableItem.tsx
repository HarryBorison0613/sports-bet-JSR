import Link from '@app/link'
import React from 'react'
import type { ISportEventSummary } from 'src/interface'
import cx from 'classnames'
import { MatchTableTeam } from './MatchTableTeam'
import LiveIndicator from 'src/components/LiveIndicator/LiveIndicator'

export interface IMatchTableItemProps {
  href: any
  scoreText: any
  event: ISportEventSummary
}

const MatchTableItem: React.FC<IMatchTableItemProps> = ({
  event,
  href,
  scoreText,
}) => {
  const live = React.useMemo(
    () => event?.sport_event_status?.status === 'live',
    []
  )

  return (
    <Link key={event?.sport_event?.sport_event_id} href={href}>
      <a
        className={cx(
          'border-2 rounded-md px-2 py-[0.7rem] lg:border-0 lg:border-b lg:rounded-none',
          'grid grid-cols-12 gap-1 items-center',
          'cursor-pointer hover:bg-blue-50 hover:text-primary-500',
          {
            'hover:bg-red-50 hover:text-red-500': live,
          }
        )}
      >
        <div
          className={cx(
            'text-sm opacity-60',
            'col-span-6 row-start-1 col-start-1',
            'lg:col-span-2'
          )}
        >
          {event?.sport_event?.start_date_formatted}
        </div>

        <div
          className={cx(
            'text-sm',
            'col-span-12 lg:col-span-8 lg:row-start-1',
            'grid grid-cols-12 items-center gap-6'
          )}
        >
          <MatchTableTeam team={event?.sport_event?.competitors[0]} />

          <div className="col-span-2 text-center">
            <div>{scoreText}</div>
            {event?.sport_event_status?.status === 'live' && (
              <LiveIndicator className="text-[0.4rem] lg:text-[0.55rem] w-full mt-1 px-2" />
            )}
          </div>

          <MatchTableTeam team={event?.sport_event?.competitors[1]} />
        </div>

        <div
          className={cx(
            'text-sm text-right opacity-60',
            'col-span-6 col-start-7 row-start-1',
            'lg:col-span-2'
          )}
        >
          {event?.sport_event?.sport_event_context?.season?.name}
        </div>
      </a>
    </Link>
  )
}

export default React.memo(MatchTableItem)
