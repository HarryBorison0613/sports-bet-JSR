import Link from '@app/link'
import React from 'react'
import Card, { ICardProps } from 'src/components/Card/Card'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useTeamContext from 'src/hooks/useTeamContext/useTeamContext'
import TeamMatchItem from './TeamMatchItem'
import { TeamMatchSkeleton } from './TeamMatchSkeleton'

const TeamMatch: React.FC<ICardProps> = (props) => {
  const { isLoadingTeamContext, upcomingMatch, createCustomTeamHref } =
    useTeamContext()

  const { createSeasonHref } = useCreateHref()

  const upcomingMatchContext = React.useMemo(
    () => upcomingMatch?.sport_event?.sport_event_context,
    [upcomingMatch?.sport_event?.sport_event_context]
  )

  if (isLoadingTeamContext) {
    return <TeamMatchSkeleton {...props} />
  }

  if (!upcomingMatchContext) {
    return <></>
  }

  return (
    <Card title="Jogo" {...props}>
      <Card.Content className="border-b">
        <Card.Header
          size="small"
          title={upcomingMatchContext?.season?.name}
          titleHref={createSeasonHref({
            ...upcomingMatchContext?.season,
            country_info: upcomingMatchContext?.category?.country_info,
          })}
          icon={upcomingMatchContext?.competition?.icon}
          descriptionText={upcomingMatch?.sport_event?.start_date_formatted}
        />
      </Card.Content>

      <Card.Content className="!px-3">
        <div className="grid grid-cols-12 items-center">
          <Link
            href={createCustomTeamHref(
              upcomingMatch?.sport_event?.competitors[0]!
            )}
          >
            <TeamMatchItem
              team={upcomingMatch?.sport_event?.competitors[0]}
              isHomeTeam
            />
          </Link>

          <div className="col-span-2 text-center text-sm font-semibold">vs</div>

          <Link
            href={createCustomTeamHref(
              upcomingMatch?.sport_event?.competitors[1]!
            )}
          >
            <TeamMatchItem team={upcomingMatch?.sport_event?.competitors[1]} />
          </Link>
        </div>
      </Card.Content>
    </Card>
  )
}

export default TeamMatch
