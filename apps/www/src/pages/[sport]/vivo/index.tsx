import type { GetStaticPaths, GetStaticProps } from 'next'
import MatchList from 'src/components/MatchList/MatchList'
import { sports } from 'src/constants'
import type { IPageSEOProps } from 'src/interface'
import MatchListLayout from 'src/layouts/MatchListLayout/MatchListLayout'
import { withDefaultISRConfig } from 'src/utils/isr'

const MatchListPage: React.FC = () => {
  return <MatchList />
}

;(MatchListPage as any).Layout = MatchListLayout

export default MatchListPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: sports?.map((sport) => ({
      params: {
        sport,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Create prop object
  const props: IPageSEOProps = {
    seo: {
      title: `${ctx?.params?.sport}`,
      titleTemplate: `%s Resultados ao vivo | Apostas Esportivas Profissionais - Bets.com.br`,
      description: `${ctx?.params?.sport} Resultados ao vivo | Apostas Esportivas Profissionais - Bets.com.br`,
    },
  }

  return withDefaultISRConfig({
    props,
  })
}
