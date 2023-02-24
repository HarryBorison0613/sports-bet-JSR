import MatchTabBarSkeleton from './MatchTabBarSkeleton'
import MatchTabBarEmpty from './MatchTabBarEmpty'
import { withMatchTabBarWrapper } from './withMatchTabBarWrapper'
import useMatchListContext from 'src/hooks/useMatchListContext/useMatchListContext'
import MatchTabBarContent from './MatchTabBarContent'

const MatchTabBar: React.FC = () => {
  const { games, isLoadingMatchListContext } = useMatchListContext()

  if (isLoadingMatchListContext) {
    return <MatchTabBarSkeleton />
  }

  if (!games || games?.length === 0) {
    return <MatchTabBarEmpty />
  }

  return (
    <div>
      <MatchTabBarContent games={games} />
    </div>
  )
}

export default withMatchTabBarWrapper(MatchTabBar)
