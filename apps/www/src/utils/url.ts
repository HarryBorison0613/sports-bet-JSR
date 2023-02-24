import { generateUrl } from '@corex/url'
import { templateString } from './string'

/**
 * Prefix site url
 * @param path
 * @returns
 */
export const withSiteUrl = (path: string) =>
  generateUrl(
    process?.env?.NEXT_PUBLIC_SITE_URL ?? 'https://www.bets.com.br',
    path
  )

/**
 * Generate canonical url
 * @param pathTemplate
 * @param args
 * @returns
 */
export const generateCanonicalUrl = (pathTemplate: string, args: any) =>
  withSiteUrl(templateString(pathTemplate, args))
