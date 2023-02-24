// import GameAbout from 'src/components/GameAbout/GameAbout'
import GameClassification from 'src/components/GameClassification/GameClassification'
import GameTeamVsTeam from 'src/components/GameTeamVsTeam/GameTeamVsTeam'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import ThreeColumnLayout from 'src/layouts/ThreeColumnLayout/ThreeColumnLayout'
import { GameContextProvider } from 'src/context/GameContext/GameContext'
import GameStatistics from 'src/components/GameStatistics/GameStatistics'
import SocialChannelCard from 'src/components/SocialChannelCard/SocialChannelCard'
import GameAbout from 'src/components/GameAbout/GameAbout'
import PromoCTA from 'src/components/PromoCTA/PromoCTA'

const GameLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  return (
    <>
      <GameContextProvider>
        <MainLayout>
          <ThreeColumnLayout
            left={
              <>
                <GameAbout />
                <GameClassification className="lg:hidden" />
                <GameStatistics />
                <GameTeamVsTeam />
              </>
            }
            right={
              <>
                <GameClassification className="hidden lg:block" />
                <SocialChannelCard />
                <PromoCTA />
              </>
            }
          >
            {children}
          </ThreeColumnLayout>
        </MainLayout>
      </GameContextProvider>
    </>
  )
}

export default GameLayout
