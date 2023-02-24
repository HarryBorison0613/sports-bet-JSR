import type { GetStaticPaths, GetStaticProps } from 'next'
import MatchListDetailed from 'src/components/MatchListDetailed/MatchListDetailed'
import { sports } from 'src/constants'
import type { IPageSEOProps } from 'src/interface'
import AllMatchesLayout from 'src/layouts/AllMatchesLayout/AllMatchesLayout'
import { withDefaultISRConfig } from 'src/utils/isr'

const MatchListPage: React.FC = () => {
  return <MatchListDetailed />
}

;(MatchListPage as any).Layout = AllMatchesLayout

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
