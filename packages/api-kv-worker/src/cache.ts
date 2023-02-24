import { isMatch } from 'matcher'
import type {
  IGameSummary,
  ISeason,
  ISeasonStanding,
} from '@apps/www/src/interface'
import parseISO from 'date-fns/parseISO'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import isPast from 'date-fns/isPast'
import { ENDPOINT_PATTERNS, TTL } from './constants'

export class Cache {
  /**
   * Generates ttl for competition season
   * @param seasons
   * @returns
   */
  getCompetitionSeasonsTTL(seasons: ISeason[]) {
    // Sort seasons by date
    const sortedSeasons = seasons?.sort(
      (a: ISeason, b: ISeason) =>
        new Date(b?.start_date).getTime() - new Date(a?.start_date).getTime()
    )

    // Find latest season
    const latestSeason = sortedSeasons[0]

    // No latest seasons
    if (!latestSeason) {
      return TTL('1_day')
    }

    // Latest season end date
    const latestSeasonEndDate = parseISO(latestSeason?.end_date)

    // Check whether the season already completed or not
    const isSeasonCompleted = isPast(latestSeasonEndDate)

    // If the season is completed check for more season on next day
    if (isSeasonCompleted) {
      return TTL('1_day')
    }

    // Season not completed, return the time left for the season to end
    return differenceInSeconds(latestSeasonEndDate, new Date())
  }

  /**
   * Match list TTL
   * @param summaries
   * @returns
   */
  getMatchListTTL(summaries: IGameSummary[]) {
    // Check for not started match or live matches
    const activeGames = summaries?.filter(
      (x) =>
        x?.sport_event_status?.status === 'live' ||
        x?.sport_event_status?.status === 'not_started'
    )

    // No active games, return long cache
    if (!activeGames || activeGames?.length === 0) {
      return TTL('1_year')
    }

    // Active games or live games going on
    return
  }

  /**
   * Resolve season standings cache
   * @param standings
   */
  getSeasonStandingsTTL(standings: ISeasonStanding[]) {
    return TTL('1_day')
  }

  /**
   * Create objectTTL
   * Returns undefined for permanent cache
   * @param pathname
   * @param data
   * @returns
   */
  private objectTTL(pathname: string, data: any) {
    // Competition info
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitionInfo)) {
      return TTL('1_year')
    }

    // Competition seasons
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitionSeasons)) {
      return this.getCompetitionSeasonsTTL(data?.seasons ?? [])
    }

    // Season competitors
    if (isMatch(pathname, ENDPOINT_PATTERNS.seasonCompetitors)) {
      return TTL('1_year')
    }

    // Match list schedule summaries
    if (isMatch(pathname, ENDPOINT_PATTERNS.scheduleSummaries)) {
      return this.getMatchListTTL(data?.summaries ?? [])
    }

    // Competitions
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitions)) {
      return TTL('1_year')
    }

    // Season standings
    if (isMatch(pathname, ENDPOINT_PATTERNS.seasonStandings)) {
      return this.getSeasonStandingsTTL(data?.standings ?? [])
    }

    // Season summaries
    if (isMatch(pathname, ENDPOINT_PATTERNS.seasonSummaries)) {
      return this.getMatchListTTL(data?.summaries ?? [])
    }

    // Competitor profile
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitorProfile)) {
      return TTL('1_year')
    }

    // Sport event summary
    if (isMatch(pathname, ENDPOINT_PATTERNS.sportEventSummary)) {
      return this.getMatchListTTL([data])
    }

    // Competitor versus competitor
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitorVersusCompetitor)) {
      return TTL('1_day')
    }

    // Competitor summaries
    if (isMatch(pathname, ENDPOINT_PATTERNS.competitorSummaries)) {
      return this.getMatchListTTL(data?.summaries ?? [])
    }

    // Default 1 min
    return TTL('1_min')
  }

  /**
   * Calculate object expiry based on request endpoint and input data
   * @param pathname
   * @param data
   * @returns
   */
  calculateObjectExpiry(pathname: string, data: any) {
    return {
      data: JSON.stringify(data),
      expirationTtl: this.objectTTL(pathname, data),
    }
  }
}
