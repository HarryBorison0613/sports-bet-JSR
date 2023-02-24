import useTeamSummary from 'src/hooks/useTeamSummary/useTeamSummary'
import type { ITeam } from 'src/interface'
import { LatestSeasonTeamContentSkeleton } from '../LatestSeasonTeamContentSkeleton'
import cx from 'classnames'
import Image from '@app/image'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'
import React from 'react'

export interface ILatestSeasonTeamContentProps {
  team: ITeam
  sport: string
}

const LatestSeasonTeamContent: React.FC<ILatestSeasonTeamContentProps> = ({
  team,
  sport,
}) => {
  const { isValidating, data } = useTeamSummary(sport, team?.team_id)

  const { createGameHref } = useCreateHref()

  if (isValidating) {
    return <LatestSeasonTeamContentSkeleton />
  }

  if (!data?.recent_events) {
    return (
      <div className="text-center text-sm text-slate-500 py-4">
        - Nenhum dado disponível -
      </div>
    )
  }

  return (
    <div className="grid gap-4 text-sm">
      {data?.recent_events?.map((item) => (
        <Link key={item?.sport_event_id} href={createGameHref(item?.event)}>
          <a
            className={cx(
              'grid grid-cols-12 items-center gap-2',
              'hover:bg-blue-100 hover:text-primary-500 cursor-pointer',
              'p-4 border rounded-md',
              {
                'bg-primary-200 hover:!bg-primary-300 hover:!text-white text-white':
                  item?.status === 'not_started',
              }
            )}
          >
            <div className="col-span-3 lg:col-span-2 flex items-center gap-2">
              <div className="col-span-1 text-xs opacity-60">VS</div>
              <div className="font-semibold">
                {item?.teamScore}-{item?.vsScore}
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-6 lg:col-span-4">
              {item?.vs?.icon && (
                <Image
                  src={item?.vs?.icon}
                  alt={item?.vs?.name}
                  width={24}
                  height={24}
                />
              )}
              <div> {item?.vs?.name}</div>
            </div>

            <div className="flex justify-end lg:justify-center col-span-3 lg:col-span-2">
              {item?.match_status === 'not_started' ? (
                <div>{item?.start_time_formatted}</div>
              ) : (
                <div
                  className={cx(
                    'bg-amber-500 text-white w-6 aspect-square rounded-full grid place-content-center',
                    {
                      '!bg-green-500': item?.match_result === 'W',
                      '!bg-red-500': item?.match_result === 'L',
                    }
                  )}
                >
                  {item?.match_result}
                </div>
              )}
            </div>

            <div className="text-right text-sm opacity-60 col-span-12 lg:col-span-4 truncate">
              {item?.start_date_formatted}
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default React.memo(LatestSeasonTeamContent)
