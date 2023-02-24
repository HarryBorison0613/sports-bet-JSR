import type {
  ILeagueSummary,
  IPageSEOProps,
  ISeasonSummary,
} from 'src/interface'
import { merge } from '@corex/deepmerge'
import { GetStaticProps } from 'next'
import { sports } from 'src/constants'

export interface IISRConfigOptions {
  props: IPageSEOProps & {
    initLeagueSummary?: ILeagueSummary
    initSeasonSummary?: ISeasonSummary
  }
}

export const withDefaultISRConfig = (options: IISRConfigOptions) => {
  // Generate canonical url
  //const canonical= ctx

  return merge([
    options,
    {
      revalidate: 10,
    },
  ])
}

/**
 * Add protection by allowing only sports page contents
 * @param getStaticProps
 * @returns
 */
export const withSportsPathStaticProps = (getStaticProps: GetStaticProps) => {
  // Generate a wrapper method
  const wrappedMethod: GetStaticProps = async (ctx) => {
    // Extract variables
    const { sport } = ctx?.params as any

    // Check whether it's a valid sports page
    if (!sports.includes(sport)) {
      return {
        redirect: {
          destination: '/logo.png',
          permanent: true,
        },
      }
    }

    // Process the page
    return getStaticProps(ctx)
  }

  return wrappedMethod
}
