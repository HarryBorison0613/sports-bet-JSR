import Link from '@app/link'
import CardList from 'src/components/CardList/CardList'
import CardListButton from 'src/components/CardListButton/CardListButton'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { ILeague } from 'src/interface'

export interface IMostPopularLeaguesContentProps {
  title: string
  leagues: ILeague[]
  query: any
}

const MostPopularLeaguesContent: React.FC<IMostPopularLeaguesContentProps> = ({
  title,
  leagues,
  query,
}) => {
  const { paginatedData, completed, nextPage } = usePaginatedData(leagues, 5)

  return (
    <CardList title={title} viewMore={!completed} onClickViewMore={nextPage}>
      {paginatedData?.map((league) => {
        return (
          <Link
            key={league?.league_id}
            href={{
              pathname: '/[sport]/[category]/[league_id]/[season_slug]',
              query: {
                sport: query?.sport,
                season_slug: league?.slug,
                category: league?.country_info?.slug,
                league_id: league?.league_id,
              },
            }}
          >
            <CardListButton icon={league?.icon} label={league?.name} />
          </Link>
        )
      })}
    </CardList>
  )
}

export default MostPopularLeaguesContent
