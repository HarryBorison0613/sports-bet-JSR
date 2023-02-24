import { NextResponse, NextRequest } from 'next/server'
import type { ILeagueSummary } from './interface'

/**
 * matcher allows you to filter Middleware to run on specific paths.
 * Note: The matcher values need to be constants so they can be statically analyzed at build-time.
 * Dynamic values such as variables will be ignored.
 * @see https://nextjs.org/docs/advanced-features/middleware#matcher
 */
export const config = {
  matcher: [
    '/futebol/:category/:league_id/:season_slug',
    '/basquete/:category/:league_id/:season_slug',
    '/futebol-americano/:category/:league_id/:season_slug',
    '/hockey-no-gelo/:category/:league_id/:season_slug',
    '/beisebol/:category/:league_id/:season_slug',
  ],
}

/**
 * Middleware to redirect Most Popular Leagues to active season
 * @param req
 * @returns
 */
const middleware = async (req: NextRequest) => {
  console.log('------RUNNING MIDDLEWARE----')

  // Extract params from pathname
  const [_, sport, category, league_id] = req?.nextUrl?.pathname?.split('/')

  // API endpoint to parse the latest season data
  // http://localhost:3000/api/futebol/brasil/leagues/325
  const endpoint = `${req?.nextUrl?.origin}/api/${sport}/${category}/leagues/${league_id}`

  // Fetch data
  const result = await fetch(endpoint)

  // Skip to next if response is invalid
  if (!result.ok) {
    return NextResponse.next()
  }

  // Find summary for this season
  const summary: ILeagueSummary = await result.json()

  // Redirect url to latest season
  const redirectUrl = new URL(
    `${req?.nextUrl?.pathname}/${summary?.current_season?.season_id}`,
    req?.url
  )

  return NextResponse.redirect(redirectUrl)
}

export default middleware
