import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import MatchListEmptyDetailed from './MatchListEmptyDetailed'
import MatchListSkeletonDetailed from './MatchListSkeletonDetailed'
import withMatchListWrapperDetailed from './withMatchListWrapperDetailed'
import MatchListContent from './MatchListContentDetailed'

const MatchList: React.FC = () => {
  const { isLoadingMatchListContext, games } = useMatchListContext()

  if (isLoadingMatchListContext) {
    return <MatchListSkeletonDetailed />
  }

  if (!games || games?.length === 0) {
    return <MatchListEmptyDetailed />
  }

  return <MatchListContent games={games} />
}

export default withMatchListWrapperDetailed(MatchList)
