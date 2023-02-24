import CardGrid from 'src/components/CardGrid/CardGrid'
import { SeasonBestPlayersGrid } from './SeasonBestPlayersGrid'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'

const SeasonBestPlayers: React.FC = () => {
  const { isLoadingSeasonContext, bestPlayers } = useSeasonContext()

  // Loading
  if (isLoadingSeasonContext) {
    return (
      <CardGrid
        title="Melhores jogadores"
        className="grid-cols-2"
        loading
        skeletonCount={10}
      />
    )
  }

  // Empty state
  if (!bestPlayers || bestPlayers?.length === 0) {
    return <></>
  }

  return <SeasonBestPlayersGrid players={bestPlayers} />
}

export default SeasonBestPlayers
