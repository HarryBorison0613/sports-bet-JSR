import {
  siteAccent,
  siteIcon,
  siteImage,
  siteLogo,
  siteUrl,
  topTags,
  secondaryTags,
  links,
} from '@/lib/siteDefault'
import { withHttps } from '@/lib/helpers/url'

export const GHOST_API_URL = process.env.GHOST_API_URL
export const GHOST_API_KEY = process.env.GHOST_API_KEY
export const GHOST_API_VERSION = process.env.GHOST_API_VERSION

const url = process.env.SITE_URL || process.env.VERCEL_URL || siteUrl

export const defaultSettings = {
  siteUrl: withHttps(url),
  siteIcon: siteIcon,
  siteImage: siteImage,
  siteAccent: siteAccent,
  topTags: topTags,
  secondaryTags: secondaryTags,
  siteLogo: siteLogo,
  links: links,
}
