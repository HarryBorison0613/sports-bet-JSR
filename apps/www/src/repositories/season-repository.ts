import type {
  IPlayer,
  ISeason,
  ISeasonStanding,
  ISeasonStandingGroup,
  ISeasonStandingGroupStanding,
  ISeasonStandingStatistics,
  ISeasonStandingSummary,
  ISeasonStandingTypeStatistics,
  ISeasonSummary,
  ISportEventSummary,
} from 'src/interface'
import { apiEndpoints, toId, toSrId } from 'src/utils/api'
import { TeamRepository } from './team-repository'
import { formatDate, dateRangePercentage } from 'src/utils/date'
import { toKebabCase } from '@corex/string-util'
import { CountryRepository } from './country-repository'
import { percentage } from 'src/utils/number'
import { LeagueRepository } from './league-repository'
import { GameRepository } from './game-repository'
import { TextRepository } from './text-repository'
import { SeasonStreakRepository } from './season-streak-repository'
import { SeasonBestPlayersRepository } from './season-best-players-repository'

export class SeasonRepository {
  teamRepo = new TeamRepository()

  countryRepo = new CountryRepository()

  leagueRepo = new LeagueRepository()

  seasonStreakRepo = new SeasonStreakRepository()

  /**
   * Normalize season
   * @param categoryName
   * @param season
   * @returns
   */
  normalizeSeason = (season: ISeason, categoryName: string): ISeason => {
    //return season

    const { id, name, competition_id, ...rest } = season

    const countryInfo = this.countryRepo.findCountryByName(categoryName!)

    const icon = this.leagueRepo.getLeagueIcon(countryInfo, name)

    return {
      ...rest,
      id,
      competition_id,
      name,
      season_id: toId(id)!,
      league_id: toId(competition_id)!,
      slug: toKebabCase(name ?? ''),
      icon,
      start_date_formatted: formatDate(rest.start_date),
      end_date_formatted: formatDate(rest.end_date),
      season_progress: dateRangePercentage(rest.start_date, rest.end_date)!,
    } as any
  }

  async seasonLeaders(
    sport: string,
    season_id: string
  ): Promise<IPlayer[] | void> {
    // Create season id
    const srSeasonId = toSrId('season', season_id)

    // Build endpoint
    const apiEndpoint = apiEndpoints[sport]?.__DEFAULT__(
      `seasons/${srSeasonId}/leaders.json`
    )

    // Fetch
    const response = await fetch(apiEndpoint)

    // Return if response fails
    if (!response.ok) {
      return
    }

    // Extract response
    const stats = await response.json()

    // Find points list
    const pointsList = stats?.lists?.find((x: any) => x?.type === 'points')

    const flattenPlayers = pointsList?.leaders
      ?.flatMap((x: any) => x.players)
      .slice(0, 10)

    // Create team repo
    const teamRepo = new TeamRepository()

    const normalizedLeaders = flattenPlayers?.map((x: any, index: number) => {
      const { competitors, id, ...rest } = x

      return {
        ...rest,
        id: toId(id),
        rank: index + 1,
        team: teamRepo.normalizeTeam(competitors[0]),
      }
    })

    return normalizedLeaders
  }

  normalizeSummary(summary: ISportEventSummary): ISportEventSummary {
    // Game repo
    const gameRepo = new GameRepository()

    // Normalize sport event
    const sport_event = gameRepo.normalizeSportEvent(summary?.sport_event)

    // Normalize sport event status
    const sport_event_status = gameRepo.normalizeSportEventStatus(
      summary?.sport_event_status
    )

    return {
      ...summary,
      sport_event,
      sport_event_status,
      statistics: {
        totals: {
          competitors: summary?.statistics?.totals?.competitors?.map((x) =>
            this.teamRepo?.normalizeTeam(x)
          ),
        },
      },
    }
  }

  filterAndSortSummaries(
    summaries: ISportEventSummary[],
    filterPredicate: (x: ISportEventSummary) => boolean,
    sortOrder: 'asc' | 'desc' = 'desc'
  ) {
    return summaries
      ?.filter(filterPredicate)
      ?.sort((a: ISportEventSummary, b: ISportEventSummary) =>
        sortOrder === 'desc'
          ? new Date(b?.sport_event?.start_time).getTime() -
            new Date(a?.sport_event?.start_time).getTime()
          : new Date(a?.sport_event?.start_time).getTime() -
            new Date(b?.sport_event?.start_time).getTime()
      )
  }

  normalizeSummaries(summaries: ISportEventSummary[]) {
    const normalizedSummaries = summaries?.map((x) => this.normalizeSummary(x))

    // Completed events
    const completed_events = this.filterAndSortSummaries(
      normalizedSummaries,
      (x) => x?.sport_event_status?.match_status === 'ended'
    )

    // Upcoming events
    const upcoming_events = this.filterAndSortSummaries(
      normalizedSummaries,
      (x) => x?.sport_event_status?.match_status === 'not_started',
      'asc'
    )

    const sport_event_context =
      [
        ...(completed_events?.slice(0, 1) ?? []),
        ...(upcoming_events?.slice(0, 1) ?? []),
      ]
        .filter(Boolean)
        .slice(0, 1)[0]?.sport_event?.sport_event_context ??
      normalizedSummaries[0]?.sport_event?.sport_event_context

    return {
      sport_event_context,
      upcoming_events,
      completed_events,
    }
  }

  async fetchSeasonSummary(sport: string, season_id: string) {
    // Find api endpoint
    const sportAPi = apiEndpoints[sport]

    // Return if endpoint is null
    if (!sportAPi) {
      return
    }

    // Extract endpoint
    const endpoint = sportAPi.__DEFAULT__(
      `seasons/${toSrId('season', season_id)}/summaries.json`
    )

    // Fetch result
    const response = await fetch(endpoint)

    // Return if response is bad
    if (!response?.ok) {
      return
    }

    // Result
    return response.json()
  }

  /**
   * Extract season team from summaries
   * @param summaries
   * @returns
   */
  seasonTeams(summaries: ISportEventSummary[]) {
    // Extract teams from summaries
    const teams = summaries?.flatMap((x) => x.sport_event?.competitors)

    // Pick unique teams
    const uniqueTeams = [
      ...new Map(teams.map((team) => [team['id'], team])).values(),
    ]

    // Normalize and return team
    return uniqueTeams?.map((x) => this.teamRepo.normalizeTeam(x))
  }

  /**
   * Season summary
   * @param sport
   * @param season_id
   * @returns
   */
  async seasonSummary(
    sport: string,
    season_id: string
  ): Promise<ISeasonSummary | undefined> {
    const seasonData = await this.fetchSeasonSummary(sport, season_id)

    // Return if seasonData is empty
    if (!seasonData?.summaries) {
      return
    }

    // Parse teams
    const teams = this.seasonTeams(seasonData?.summaries)

    // Return if no teams exist
    if (!teams) {
      return
    }

    const best_players = new SeasonBestPlayersRepository().bestPlayers(
      seasonData?.summaries
    )

    const summaries = this.normalizeSummaries((seasonData as any)?.summaries)

    // All seasons
    const all_seasons = await this.leagueRepo.leagueSeasons(
      sport,
      summaries?.sport_event_context?.category?.slug,
      summaries?.sport_event_context?.competition?.league_id
    )

    // Normalize summary
    const summary: ISeasonSummary = {
      ...summaries,
      teams,
      best_players,
      all_seasons: all_seasons ?? [],
    } as any

    return {
      ...summary,
      season_summary_text: new TextRepository().seasonSummaryText(summary),
    }
  }

  normalizeSeasonStandingGroupStanding(
    standing: ISeasonStandingGroupStanding
  ): ISeasonStandingGroupStanding {
    return {
      ...standing,
      streak_formatted: this.seasonStreakRepo.getFormattedStreak(standing),
      competitor: this.teamRepo.normalizeTeam(standing?.competitor),
    }
  }

  normalizeSeasonStandingGroup(
    group: ISeasonStandingGroup
  ): ISeasonStandingGroup {
    return {
      ...group,
      group_id: toId(group?.id)!,
      standings: group?.standings?.map((x) =>
        this.normalizeSeasonStandingGroupStanding(x)
      ),
    }
  }

  normalizeSeasonStanding(standing: ISeasonStanding): ISeasonStanding {
    return {
      ...standing,
      groups: standing?.groups?.map((x) =>
        this.normalizeSeasonStandingGroup(x)
      ),
    }
  }

  getSeasonStandingTypeStatistics(
    standing?: ISeasonStanding
  ): ISeasonStandingTypeStatistics {
    const goals = standing?.groups[0]?.standings?.reduce((prev, curr) => {
      return prev + curr?.goals_for
    }, 0)

    const points = standing?.groups[0]?.standings?.reduce((prev, curr) => {
      return prev + curr?.points_for
    }, 0)

    const draw = standing?.groups[0]?.standings?.reduce((prev, curr) => {
      return prev + curr?.draw
    }, 0)

    const win = standing?.groups[0]?.standings?.reduce((prev, curr) => {
      return prev + curr?.win
    }, 0)

    const total_competitors = standing?.groups[0]?.standings?.length

    return {
      goals,
      draw,
      win,
      points,
      total_competitors,
    }
  }

  getSeasonStandingStatistics(
    standings: ISeasonStanding[]
  ): ISeasonStandingStatistics {
    // Find total standings
    const totalStanding = standings?.find((x) => x.type === 'total')

    // Find home standings
    const homeStanding = standings?.find((x) => x.type === 'home')

    // Find away standings
    const awayStanding = standings?.find((x) => x.type === 'away')

    // Calculate total standing type stat
    const totalStandingTypeStat =
      this.getSeasonStandingTypeStatistics(totalStanding)

    // Calculate home standing type stat
    const homeStandingTypeStat =
      this.getSeasonStandingTypeStatistics(homeStanding)

    // Calculate away standing type stat
    const awayStandingTypeStat =
      this.getSeasonStandingTypeStatistics(awayStanding)

    // Total matches count
    const totalCount =
      (totalStandingTypeStat?.win ?? 0) + (totalStandingTypeStat?.draw ?? 0)

    return {
      total: totalStandingTypeStat,
      home: homeStandingTypeStat,
      away: awayStandingTypeStat,
      draw_percentage:
        percentage(totalCount, totalStandingTypeStat?.draw ?? 0) ?? 0,
      home_win_percentage:
        percentage(totalCount, homeStandingTypeStat?.win ?? 0) ?? 0,
      away_win_percentage:
        percentage(totalCount, awayStandingTypeStat?.win ?? 0) ?? 0,
      top_competitors:
        totalStanding?.groups[0]?.standings
          ?.slice(0, 2)
          ?.flatMap((x) => x.competitor) ?? [],
    }
  }

  async fetchSeasonStandings(sport: string, season_id: string) {
    // Find api endpoint
    const sportAPi = apiEndpoints[sport]

    // Return if endpoint is null
    if (!sportAPi) {
      return
    }

    // Extract endpoint
    const endpoint = sportAPi.__DEFAULT__(
      `seasons/${toSrId('season', season_id)}/standings.json`
    )

    // Fetch result
    const response = await fetch(endpoint)

    // Return if response is bad
    if (!response?.ok) {
      return
    }

    // Result
    return response.json()
  }

  async seasonStandingsSummary(
    sport: string,
    season_id: string
  ): Promise<ISeasonStandingSummary | undefined> {
    const standingsData = await this.fetchSeasonStandings(sport, season_id)

    if (!standingsData) {
      return
    }

    const standings = standingsData?.standings?.map((x: any) =>
      this.normalizeSeasonStanding(x as any)
    )

    return {
      standings,
      statistics: this.getSeasonStandingStatistics(standings),
    }
  }
}
