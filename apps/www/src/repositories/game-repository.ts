import { apiEndpoints, toId, toSrId } from 'src/utils/api'
import { formatDate, formatTime } from 'src/utils/date'
import { SeasonRepository } from './season-repository'
import { TeamRepository } from './team-repository'
import type {
  IGameSummary,
  ISportEvent,
  ISportEventContext,
  ISportEventStatus,
} from 'src/interface'
import { LeagueRepository } from './league-repository'
import { CategoryRepository } from './category-repository'
import { SportRepository } from './sport-repository'

export class GameRepository {
  teamRepo = new TeamRepository()

  seasonRepo = new SeasonRepository()

  leagueRepo = new LeagueRepository()

  categoryRepo = new CategoryRepository()

  sportRepo = new SportRepository()

  normalizeSportEventContext(
    sport_event_context: ISportEventContext
  ): ISportEventContext {
    // Normalize category
    const category = this.categoryRepo.normalizeCategory(
      sport_event_context?.category
    )

    // Normalize league
    const competition = this.leagueRepo.normalizeLeague(
      category?.country_info,
      sport_event_context?.competition
    )

    // Normalize sport
    const sport = this.sportRepo.normalizeSport(sport_event_context?.sport)

    // Normalize season
    const season = this.seasonRepo?.normalizeSeason(
      sport_event_context?.season,
      category?.name
    )

    return {
      ...sport_event_context,
      season,
      category,
      sport,
      competition,
    }
  }

  /**
   * Normalize sport event
   * @param event
   * @returns
   */
  normalizeSportEvent(event: ISportEvent): ISportEvent {
    // Competitors
    const competitors = event?.competitors?.map((x) =>
      this.teamRepo?.normalizeTeam(x)
    )

    // Normalize sport event context
    const sport_event_context = this.normalizeSportEventContext(
      event?.sport_event_context
    )

    return {
      ...event,
      sport_event_id: toId(event?.id),
      start_date_formatted: formatDate(event?.start_time),
      start_time_formatted: formatTime(event?.start_time),
      competitors,
      sport_event_context,
    }
  }

  normalizeSportEventStatus(
    sport_event_status: ISportEventStatus
  ): ISportEventStatus {
    const { winner_id, ...rest } = sport_event_status

    return {
      ...rest,
      winner_id: winner_id ? toId(winner_id) : undefined,
    } as any
  }

  normalizeGameSummary(summary: IGameSummary): IGameSummary {
    // Merge sport event with stat competitors
    const merged_sport_event = summary?.sport_event

    // Normalize sport event
    const normalizedSportEvent = this.normalizeSportEvent(merged_sport_event)

    const sport_event_status = this.normalizeSportEventStatus(
      summary.sport_event_status
    )

    const statisticsCompetitors = summary?.statistics?.totals?.competitors?.map(
      (x) => this.teamRepo.normalizeTeam(x)
    )

    return {
      ...summary,
      sport_event: normalizedSportEvent,
      statistics: {
        totals: {
          competitors: statisticsCompetitors,
        },
      },
      sport_event_status,
    }
  }

  async fetchGameData(sport: string, game_id: string) {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const srGameId = toSrId('sport_event', `${game_id}`)

    const endpoint = savedGameApi.__DEFAULT__(
      `sport_events/${srGameId}/summary.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  async gameSummary(sport: string, game_id: string): Promise<IGameSummary> {
    const gameData = await this.fetchGameData(sport, game_id)

    const gameSummary = this.normalizeGameSummary(gameData as any)

    // Home team id
    const homeTeamId = gameSummary?.sport_event?.competitors?.find(
      (x) => x.qualifier === 'home'
    )?.team_id!

    // Away team id
    const awayTeamId = gameSummary?.sport_event?.competitors?.find(
      (x) => x.qualifier === 'away'
    )?.team_id!

    const home_vs_away = await this.teamRepo.getTeamVsTeamData(
      sport,
      homeTeamId,
      awayTeamId
    )

    // Parse home profile
    const home_profile = await this.teamRepo.teamProfile(sport, homeTeamId)

    // Parse away profile
    const away_profile = await this.teamRepo.teamProfile(sport, awayTeamId)

    return {
      ...gameSummary,
      home_vs_away,
      home_profile,
      away_profile,
    }
  }

  async fetchLiveGames(sport: string) {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const endpoint = savedGameApi.__DEFAULT__(`schedules/live/summaries.json`)

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  async liveGames(sport: string) {
    // Fetch data
    const liveGamesData = await this.fetchLiveGames(sport)

    // Normalize summaries
    return (
      liveGamesData?.summaries?.map((x: any) => this.normalizeGameSummary(x)) ??
      []
    )
  }

  async fetchMatchSchedules(sport: string, date: string) {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const endpoint = savedGameApi.__DEFAULT__(
      `schedules/${date}/summaries.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  /**
   * Parse match schedules
   * @param sport
   * @param date
   */
  async matchSchedules(sport: string, date: string) {
    // Fetch match schedules
    const matchSchedules = await this.fetchMatchSchedules(sport, date)

    const normalizedSummaries: IGameSummary[] =
      matchSchedules?.summaries?.map((x: any) =>
        this.normalizeGameSummary(x)
      ) ?? []

    // Sort games by order
    return ['not_started', 'pause', 'live'].reduce((prev, curr) => {
      return prev?.sort((x) =>
        x?.sport_event_status?.status === curr ? -1 : 1
      )
    }, normalizedSummaries)
  }
}
