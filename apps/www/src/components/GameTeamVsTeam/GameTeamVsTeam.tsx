import Card from 'src/components/Card/Card'
import CardListSkeleton from 'src/components/CardListSkeleton/CardListSkeleton'
import useGameContext from 'src/hooks/useGameContext/useGameContext'
import { GameTeamVsTeamItemLabel } from './GameTeamVsTeamItemLabel'
import { legends } from './legends'
import dynamic from 'next/dynamic'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'

const GameTeamVsTeamChart = dynamic(
  () => import('./GameTeamVsTeamChart/GameTeamVsTeamChart'),
  {
    ssr: false,
  }
)

const GameTeamVsTeam: React.FC = () => {
  const {
    isLoadingGameContext,
    gameSummary,
    season,
    competition,
    category,
    homeTeam,
    awayTeam,
  } = useGameContext()

  const { createSeasonHref, createGameHref } = useCreateHref()

  if (isLoadingGameContext) {
    return <CardListSkeleton title="H2H" />
  }

  return (
    <Card title="H2H">
      <Card.Content className="border-b">
        <Card.Header
          size="small"
          title={season?.name!}
          icon={competition?.icon}
          titleHref={createSeasonHref({
            ...season,
            country_info: {
              ...season?.country_info,
              slug: category?.slug,
            },
          })}
          descriptionIcon={category?.country_info?.icon}
          descriptionText={category?.name}
        />
      </Card.Content>

      <Card.Content>
        <div className="flex gap-4 justify-between  items-center text-xs">
          {legends?.map((legend) => (
            <div key={legend.label} className="flex gap-2 items-center">
              <div className={`${legend.bg} w-3 aspect-square rounded-md`} />
              <div>{legend.label}</div>
            </div>
          ))}
        </div>
      </Card.Content>

      <Card.Content>
        <div className="grid gap-2">
          {gameSummary?.home_vs_away?.last_meetings?.map((summary) => {
            const home = summary?.sport_event?.competitors[0]

            const away = summary?.sport_event?.competitors[1]

            const winnerId = summary?.sport_event_status?.winner_id

            const matchTie = summary?.sport_event_status?.match_tie

            return (
              <Link
                key={summary?.sport_event?.sport_event_id}
                href={createGameHref(summary?.sport_event)}
              >
                <a className="grid gap-2 items-center grid-cols-12 text-xs text-center border-b last-of-type:border-b-0 py-2 hover:bg-blue-50 cursor-pointer">
                  {home && (
                    <GameTeamVsTeamItemLabel
                      label={home?.name}
                      icon={home?.icon}
                      winner={winnerId === home?.team_id}
                      matchTie={matchTie}
                    />
                  )}

                  <div className="col-span-2">
                    {summary?.sport_event_status?.home_score}-
                    {summary?.sport_event_status?.away_score}
                  </div>

                  {away && (
                    <GameTeamVsTeamItemLabel
                      label={away?.name}
                      icon={away?.icon}
                      winner={winnerId === away?.team_id}
                      matchTie={matchTie}
                    />
                  )}
                </a>
              </Link>
            )
          })}
        </div>
      </Card.Content>

      {gameSummary?.home_vs_away?.last_meetings &&
        gameSummary?.home_vs_away?.last_meetings.length > 0 && (
          <GameTeamVsTeamChart
            games={gameSummary?.home_vs_away?.last_meetings}
            homeTeamId={homeTeam?.team_id}
            season={season}
          />
        )}
    </Card>
  )
}

export default GameTeamVsTeam
