import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import MatchListEmpty from './MatchListEmpty'
import MatchListSkeleton from './MatchListSkeleton'
import withMatchListWrapper from './withMatchListWrapper'
import MatchListContent from './MatchListContent'

const MatchList: React.FC = () => {
  const { isLoadingMatchListContext, games } = useMatchListContext()

  if (isLoadingMatchListContext) {
    return <MatchListSkeleton />
  }

  if (!games || games?.length === 0) {
    return <MatchListEmpty />
  }

  return <MatchListContent games={games} />
}

export default withMatchListWrapper(MatchList)
