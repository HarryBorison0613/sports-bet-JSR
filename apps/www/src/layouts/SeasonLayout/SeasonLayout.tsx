import SeasonBestPlayers from 'src/components/SeasonBestPlayers/SeasonBestPlayers'
import HotNews from 'src/components/HotNews/HotNews'
import SeasonInformation from 'src/components/SeasonInformation/SeasonInformation'
import MostPopularLeagues from 'src/components/MostPopularLeagues/MostPopularLeagues'
import SeasonTeams from 'src/components/SeasonTeams/SeasonTeams'
import { SeasonContextProvider } from 'src/context/SeasonContext/SeasonContext'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import ThreeColumnLayout from 'src/layouts/ThreeColumnLayout/ThreeColumnLayout'
import PromoCTA from 'src/components/PromoCTA/PromoCTA'

const SeasonLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
  ...restProps
}) => {
  return (
    <>
      <SeasonContextProvider {...restProps}>
        <MainLayout>
          <ThreeColumnLayout
            left={
              <>
                <SeasonInformation />
                <SeasonTeams />
              </>
            }
            right={
              <>
                <SeasonBestPlayers />
                <MostPopularLeagues />
                <HotNews small />
                <PromoCTA />
              </>
            }
          >
            {children}
          </ThreeColumnLayout>
        </MainLayout>
      </SeasonContextProvider>
    </>
  )
}

export default SeasonLayout
