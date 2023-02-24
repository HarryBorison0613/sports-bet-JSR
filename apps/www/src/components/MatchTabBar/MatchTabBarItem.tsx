import React from 'react'
import useGameSummaryItem from 'src/hooks/useGameSummaryItem/useGameSummaryItem'
import type { IGameSummary } from 'src/interface'
import LiveIndicator from 'src/components/LiveIndicator/LiveIndicator'
import MatchTabBarItemTeamInfo from './MatchTabBarItemTeamInfo'

export interface IMatchTabBarItemProps {
  summary: IGameSummary
  active?: boolean
}

const MatchTabBarItem: React.ForwardRefRenderFunction<
  any,
  IMatchTabBarItemProps
> = ({ summary, ...restProps }, ref) => {
  const { homeTeam, awayTeam, live, timestamp } = useGameSummaryItem(summary)

  return (
    <a
      className="grid gap-4 items-center hover:bg-slate-200 cursor-pointer min-h-[164px] h-full py-3 "
      {...restProps}
      ref={ref}
    >
      <div className="w-10/12 mx-auto flex flex-col justify-between h-full gap-3">
        <div className="grid gap-3">
          <small className="text-slate-500 font-semibold text-xs">
            {summary?.sport_event?.sport_event_context?.competition?.name}
          </small>
        </div>

        <div className="grid gap-2">
          <MatchTabBarItemTeamInfo
            name={homeTeam?.abbreviation}
            icon={homeTeam?.icon}
            score={summary?.sport_event_status?.home_score}
          />

          <MatchTabBarItemTeamInfo
            name={awayTeam?.abbreviation}
            icon={awayTeam?.icon}
            score={summary?.sport_event_status?.away_score}
          />
        </div>

        <div className="flex items-center text-slate-500 justify-between text-xs">
          <div>{timestamp}</div>

          {live && <LiveIndicator />}
        </div>
      </div>
    </a>
  )
}

export default React.forwardRef(MatchTabBarItem)
