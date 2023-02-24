import useGameContext from 'src/hooks/useGameContext/useGameContext'
import GameAboutContent from './GameAboutContent'
import { GameAboutSkeleton } from './GameAboutSkeleton'

const GameAbout: React.FC = () => {
  const { isLoadingGameContext, gameSummary } = useGameContext()

  if (isLoadingGameContext) {
    return <GameAboutSkeleton />
  }

  return (
    <GameAboutContent
      content={[
        gameSummary?.home_profile?.summary_text ?? '',
        gameSummary?.away_profile?.summary_text ?? '',
      ]}
    />
  )
}

export default GameAbout
