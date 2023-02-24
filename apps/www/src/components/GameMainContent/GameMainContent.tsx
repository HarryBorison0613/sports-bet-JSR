import useGameContext from 'src/hooks/useGameContext/useGameContext'
import Card from 'src/components/Card/Card'
import { GameMainContentSkeleton } from './GameMainContentSkeleton'
import GameMainContentTeam from './GameMainContentTeam'
import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import Link from '@app/link'

const GameMainContent: React.FC = () => {
  const {
    isLoadingGameContext,
    gameSummary,
    season,
    category,
    competition,
    homeTeam,
    awayTeam,
  } = useGameContext()

  const { createSeasonHref, query, createTeamHref } = useCreateHref()

  // Loading state
  if (isLoadingGameContext) {
    return (
      <Card>
        <Card.Content>
          <Card.Header.Skeleton />
        </Card.Content>
        <Card.Content>
          <GameMainContentSkeleton />
        </Card.Content>
      </Card>
    )
  }

  // Empty
  if (!gameSummary) {
    return <></>
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header
          titleHref={createSeasonHref({
            ...season,
            country_info: {
              ...season?.country_info,
              slug: query?.category as string,
            },
          })}
          title={season?.name!}
          icon={competition?.icon}
          descriptionIcon={category?.country_info?.icon}
          descriptionText={category?.name!}
        >
          {/* <FollowButton /> */}
        </Card.Header>
      </Card.Content>

      <Card.Content>
        <div className="flex items-center justify-between lg:justify-center gap-4 lg:gap-8 mx-auto py-4">
          {homeTeam && (
            <Link href={createTeamHref(homeTeam, season)}>
              <GameMainContentTeam team={homeTeam} />
            </Link>
          )}

          <div className="text-2xl lg:text-4xl font-bold text-center">
            {gameSummary?.sport_event_status?.home_score ?? 0}-
            {gameSummary?.sport_event_status?.away_score ?? 0}
          </div>

          {awayTeam && (
            <Link
              href={createTeamHref(awayTeam, season)}
              prefetch={false}
              passHref={true}
              scroll={true}
            >
              <GameMainContentTeam team={awayTeam} />
            </Link>
          )}
        </div>
      </Card.Content>
    </Card>
  )
}

export default GameMainContent
