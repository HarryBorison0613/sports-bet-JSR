import HotNews from 'src/components/HotNews/HotNews'
import SocialChannelCard from 'src/components/SocialChannelCard/SocialChannelCard'
import TeamClassification from 'src/components/TeamClassification/TeamClassification'
import TeamInformation from 'src/components/TeamInformation/TeamInformation'
import TeamMatch from 'src/components/TeamMatch/TeamMatch'
import TeamLeagueStat from 'src/components/TeamLeagueStat/TeamLeagueStat'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import ThreeColumnLayout from 'src/layouts/ThreeColumnLayout/ThreeColumnLayout'
import TeamContextProvider from 'src/context/TeamContext/TeamContext'
import TeamNextGames from 'src/components/TeamNextGames/TeamNextGames'
import TeamResults from 'src/components/TeamResults/TeamResults'
import PromoCTA from 'src/components/PromoCTA/PromoCTA'

const TeamLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  return (
    <TeamContextProvider>
      <MainLayout>
        <ThreeColumnLayout
          left={
            <>
              <TeamInformation className="hidden lg:block" />
              <TeamMatch className="hidden lg:block" />
              <PromoCTA className="hidden lg:block" />
            </>
          }
          right={
            <>
              <TeamClassification />

              <TeamLeagueStat />

              <TeamResults className="lg:hidden" />

              <TeamNextGames className="lg:hidden" />

              <SocialChannelCard />

              <PromoCTA className="lg:hidden" />

              <HotNews small />
            </>
          }
        >
          {children}
        </ThreeColumnLayout>
      </MainLayout>
    </TeamContextProvider>
  )
}

export default TeamLayout
