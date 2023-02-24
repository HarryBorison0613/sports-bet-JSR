import type { IGameSummary, ISeason, ITeam } from 'src/interface'
import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import Card from 'src/components/Card/Card'
import { percentage } from 'src/utils/number'
import Progress from 'src/components/Progress/Progress'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'

export interface IGameTeamVsTeamChartProps {
  games: IGameSummary[]
  homeTeamId?: string
  season: ISeason
}

const GameTeamVsTeamChart: React.FC<IGameTeamVsTeamChartProps> = ({
  games,
  homeTeamId,
  season,
}) => {
  const { createTeamHref } = useCreateHref()

  const countMatchData = React.useCallback(
    (predicate: (x: IGameSummary) => boolean | undefined) => {
      return games?.reduce((prev, curr) => {
        return predicate(curr) ? prev + 1 : prev
      }, 0)
    },
    [games]
  )

  const matchTies = React.useMemo(
    () => countMatchData((x) => x?.sport_event_status?.match_tie),
    [countMatchData]
  )

  const getTeamStat = React.useCallback(
    (team: ITeam) => {
      const homeColor = '#22c55e'
      const awayColor = '#3b82f6'

      const won = countMatchData(
        (x) => x?.sport_event_status?.winner_id === team?.team_id
      )

      return {
        team,
        won,
        color: team?.team_id === homeTeamId ? homeColor : awayColor,
      }
    },
    [countMatchData, homeTeamId]
  )

  const teamA = React.useMemo(
    () => getTeamStat(games[0]?.sport_event?.competitors[0]),
    [games, getTeamStat]
  )

  const teamB = React.useMemo(
    () => getTeamStat(games[0]?.sport_event?.competitors[1]),
    [games, getTeamStat]
  )

  const data = React.useMemo(() => {
    const total = teamA?.won + teamB?.won + matchTies

    return [
      {
        id: teamA?.team?.name,
        label: teamA?.team?.abbreviation,
        value: teamA?.won,
        color: teamA?.color,
        icon: teamA?.team?.icon,
        percentage: percentage(total, teamA?.won),
        href: createTeamHref(teamA?.team, season),
      },
      {
        id: teamB?.team?.name,
        label: teamB?.team?.abbreviation,
        value: teamB?.won,
        color: teamB?.color,
        icon: teamB?.team?.icon,
        percentage: percentage(total, teamB?.won),
        href: createTeamHref(teamB?.team, season),
      },
      {
        id: 'empate',
        label: 'empate',
        value: matchTies,
        color: '#475569',
        percentage: percentage(total, matchTies),
        icon: '/flag.png',
        href: '#empate',
      },
    ]
  }, [
    createTeamHref,
    matchTies,
    season,
    teamA?.color,
    teamA?.team,
    teamA?.won,
    teamB?.color,
    teamB?.team,
    teamB?.won,
  ])

  return (
    <>
      <Card.Content
        className="border-t w-full aspect-square !pb-0"
        title="Importante"
      >
        <ResponsivePie
          margin={{ left: 48, right: 48 }}
          innerRadius={0}
          padAngle={0}
          cornerRadius={0}
          fit={true}
          colors={(x) => x?.data?.color}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          enableArcLabels={false}
          enableArcLinkLabels={true}
          arcLinkLabel={(x) => x.data?.label}
          arcLinkLabelsStraightLength={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLinkLabelsTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
          data={data}
          animate={true}
        />
      </Card.Content>

      <Card.Content
        className="grid !pt-0"
        title="Status de vitória (Últimos 10 jogos)"
      >
        {data?.map((data) => (
          <Link key={data?.id} href={data?.href}>
            <a>
              <Card.Header
                as="div"
                title={data?.id}
                size="small"
                icon={data?.icon}
                className="border-b py-4 last-of-type:border-b-0 !capitalize hover:bg-blue-50 cursor-pointer"
                style={{ color: data?.color }}
                titleClassName="!leading-[1.2]"
                description={
                  <Progress
                    className="flex-1 !mt-2"
                    progress={data?.percentage}
                    progressColor={data?.color}
                  />
                }
              >
                <div
                  className="font-mono font-thin"
                  style={{ color: data?.color }}
                >
                  {data?.percentage}%
                </div>
              </Card.Header>
            </a>
          </Link>
        ))}
      </Card.Content>
    </>
  )
}

export default GameTeamVsTeamChart
