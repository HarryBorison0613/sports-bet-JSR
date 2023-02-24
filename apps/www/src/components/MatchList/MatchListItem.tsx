import type { IGameSummary } from 'src/interface'
import Image from '@app/image'
import useGameSummaryItem from 'src/hooks/useGameSummaryItem/useGameSummaryItem'
import LiveIndicator from 'src/components/LiveIndicator/LiveIndicator'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'

export interface IMatchListItemProps {
  summary: IGameSummary
}

const MatchListItem: React.FC<IMatchListItemProps> = ({ summary }) => {
  const { homeTeam, awayTeam, timestamp, live } = useGameSummaryItem(summary)

  const { createGameHref } = useCreateHref()

  return (
    <Link href={createGameHref(summary?.sport_event)}>
      <a className="bg-white p-4 lg:rounded-md shadow-lg grid grid-cols-12 items-center hover:bg-blue-100 hover:text-primary-500 transition-all">
        <div className="flex items-center gap-4 col-span-4">
          {homeTeam?.icon && (
            <Image
              src={homeTeam?.icon}
              alt={homeTeam?.abbreviation}
              width={42}
              height={42}
            />
          )}
          <div className="font-bold">{homeTeam?.abbreviation}</div>
        </div>

        <div className="col-span-4 grid place-content-center gap-2 text-sm text-center">
          <span>{timestamp}</span>
          {live ? (
            <LiveIndicator />
          ) : (
            <div className="text-xs font-bold">
              Começa às {summary?.sport_event?.start_time_formatted}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 col-span-4">
          <div className="font-bold">{awayTeam?.abbreviation}</div>
          {awayTeam?.icon && (
            <Image
              src={awayTeam?.icon}
              alt={awayTeam?.abbreviation}
              width={42}
              height={42}
            />
          )}
        </div>
      </a>
    </Link>
  )
}

export default MatchListItem
