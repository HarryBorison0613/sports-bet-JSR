import useMostPopularLeagues from 'src/hooks/useMostPopularLeagues/useMostPopularLeagues'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import CardListSkeleton from '../CardListSkeleton/CardListSkeleton'
import MostPopularLeaguesContent from './MostPopularLeaguesContent'
import { useI18n } from '@corex/use-i18n'

const MostPopularLeagues: React.FC = () => {
  const { query } = useGlobalContext()

  const { data, isValidating } = useMostPopularLeagues(query?.sport as string)

  const { t } = useI18n()

  // Loading state
  if (isValidating) {
    return <CardListSkeleton title={t('most_popular_leagues')} />
  }

  // Error state
  if (!data || data?.length === 0) {
    return <></>
  }

  return (
    <MostPopularLeaguesContent
      title={t('most_popular_leagues')}
      leagues={data}
      query={query}
    />
  )
}

export default MostPopularLeagues
