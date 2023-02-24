import useSportCategoryContext from 'src/hooks/useSportCategoryContext/useSportCategoryContext'
import Card from 'src/components/Card/Card'
import CompetitionSwitcherDropdown from './CompetitionSwitcherDropdown'
import LatestSeasonDetails from './LatestSeasonDetails/LatestSeasonDetails'
import React from 'react'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import { SportCategoryDetailsSkeleton } from './SportCategoryDetailsSkeleton'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'

const SportCategoryDetails: React.FC = () => {
  // Global context
  const { category, isLoadingGlobalContext } = useGlobalContext()

  // Category context
  const { leagueSummary, isLoadingSportCategoryContext } =
    useSportCategoryContext()

  // Create season href hook
  const { createSeasonHref } = useCreateHref()

  // Create title href
  const titleHref = React.useMemo(
    () =>
      leagueSummary?.current_season && category?.country_info
        ? createSeasonHref({
            ...leagueSummary?.current_season!,
            country_info: {
              ...category?.country_info,
              slug: category?.slug,
            },
          })
        : undefined,
    [
      category?.country_info,
      category?.slug,
      createSeasonHref,
      leagueSummary?.current_season,
    ]
  )

  // Loading state
  if (isLoadingSportCategoryContext || isLoadingGlobalContext) {
    return <SportCategoryDetailsSkeleton />
  }

  // Render
  return (
    <>
      <Card>
        <Card.Content className="border-b">
          <Card.Header
            title={leagueSummary?.current_season?.name!}
            icon={leagueSummary?.league?.icon!}
            titleHref={titleHref}
            descriptionIcon={category?.country_info?.icon}
            descriptionText={category?.country_info?.name ?? category?.name}
          >
            <CompetitionSwitcherDropdown />
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <Card.Description>{leagueSummary?.summary_text}</Card.Description>
        </Card.Content>

        <Card.Content>
          <LatestSeasonDetails
            teams={leagueSummary?.current_season_teams ?? []}
            season={leagueSummary?.current_season!}
          />
        </Card.Content>

        {/* <Card.Content>
          <PastSeasonDetails />
        </Card.Content> */}
      </Card>
    </>
  )
}

export default SportCategoryDetails
