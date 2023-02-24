import { toKebabCase } from '@corex/string-util'
import type {
  ILeague,
  IRecentSportEventSummary,
  ISportEventSummary,
  ITeam,
  ITeamProfile,
  ITeamSummary,
  ITeamVsTeam,
} from 'src/interface'
import { apiEndpoints, resolveCMS, toId, toSrId } from 'src/utils/api'
import { GameRepository } from './game-repository'
import { SeasonRepository } from './season-repository'
import { CategoryRepository } from './category-repository'
import { PlayerRepository } from './player-repository'
import { TextRepository } from './text-repository'
import { TeamStatRepository } from './team-stat-repository'

export class TeamRepository {
  normalizeForm(form?: string[]) {
    return `${form ?? ''}-----`?.trim().split('').slice(0, 5)
  }

  normalizeTeam(team: ITeam): ITeam {
    const { id, name, ...restTeam } = team

    const teamId = toId(id)

    const icon = resolveCMS(`/logos/teams-v2/${teamId}.png`)

    return {
      ...restTeam,
      name,
      id: teamId as string,
      team_id: teamId as string,
      icon,
      slug: toKebabCase(restTeam?.short_name ?? name),
      form: this.normalizeForm(team?.form),
    } as ITeam
  }

  async seasonTeams(
    sport: string,
    season_id: string
  ): Promise<ITeam[] | undefined> {
    // Create season id
    const srSeasonId = toSrId('season', season_id)

    // Build endpoint
    const apiEndpoint = apiEndpoints[sport]?.__DEFAULT__(
      `seasons/${srSeasonId}/competitors.json`
    )

    // Fetch
    const result = await fetch(apiEndpoint)

    // Return null if result is empty
    if (!result.ok) {
      return
    }

    const teams = await result.json()

    return teams?.season_competitors?.map((team: ITeam) =>
      this.normalizeTeam(team)
    )
  }

  async fetchTeamVsTeamData(
    sport: string,
    home_team_id: string,
    away_team_id: string
  ): Promise<ITeamVsTeam | undefined> {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const srHomeTeamId = toSrId('competitor', `${home_team_id}`)
    const srAwayTeamId = toSrId('competitor', `${away_team_id}`)

    const endpoint = savedGameApi.__DEFAULT__(
      `competitors/${srHomeTeamId}/versus/${srAwayTeamId}/summaries.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  async getTeamVsTeamData(
    sport: string,
    home_team_id: string,
    away_team_id: string
  ): Promise<ITeamVsTeam> {
    // Fetch team vs team data
    const data = await this.fetchTeamVsTeamData(
      sport,
      home_team_id,
      away_team_id
    )

    // Create game repo instance
    const gameRepo = new GameRepository()

    // Normalize last meetings and take first 10 result
    const last_meetings = [
      ...(data?.last_meetings?.map((meeting) =>
        gameRepo.normalizeGameSummary(meeting)
      ) ?? []),
    ].slice(0, 10)

    // Normalize next meetings
    const next_meetings =
      data?.next_meetings?.map((meeting) =>
        gameRepo.normalizeGameSummary(meeting)
      ) ?? []

    return {
      last_meetings,
      next_meetings,
    }
  }

  async fetchTeamSummary(sport: string, team_id: string) {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const srTeamId = toSrId('competitor', team_id)

    const endpoint = savedGameApi.__DEFAULT__(
      `competitors/${srTeamId}/summaries.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  getRecentSportEvents(
    upcoming_events: ISportEventSummary[],
    completed_events: ISportEventSummary[]
  ) {
    return [
      ...(upcoming_events.slice(0, 2) ?? []).reverse(),
      ...(completed_events?.slice(0, 4) ?? []),
    ]
      ?.slice(0, 4)
      .reverse()
  }

  calculateRecentEvents(
    team_id: string,
    upcoming_events: ISportEventSummary[],
    completed_events: ISportEventSummary[]
  ) {
    const recentSportEvents = this.getRecentSportEvents(
      upcoming_events,
      completed_events
    )

    return recentSportEvents?.reduce<IRecentSportEventSummary[]>(
      (prev, curr) => {
        // Find the team corresponding to the target team
        const team = curr?.sport_event?.competitors?.find(
          (x) => x.team_id === team_id
        )

        // Find the team corresponding to the target team
        const vs = curr?.sport_event?.competitors?.find(
          (x) => x.team_id !== team_id
        )

        // Return if unable to find team data
        if (!team || !vs) {
          return prev
        }

        const scores =
          team?.qualifier === 'home'
            ? {
                teamScore: curr?.sport_event_status?.home_score ?? 0,
                vsScore: curr?.sport_event_status?.away_score ?? 0,
              }
            : {
                teamScore: curr?.sport_event_status?.away_score ?? 0,
                vsScore: curr?.sport_event_status?.home_score ?? 0,
              }

        const match_tie = curr?.sport_event_status?.match_tie

        const match_result = match_tie
          ? 'T'
          : team?.team_id === curr?.sport_event_status?.winner_id
          ? 'W'
          : 'L'

        prev.push({
          sport_event_id: curr?.sport_event?.sport_event_id!,
          status: curr?.sport_event_status?.status,
          start_date_formatted: curr?.sport_event?.start_date_formatted,
          start_time_formatted: curr?.sport_event?.start_time_formatted,
          team,
          vs,
          match_status: curr?.sport_event_status?.match_status,
          match_tie,
          match_result,
          event: curr?.sport_event,
          ...scores,
        })

        return prev
      },
      []
    )
  }

  async teamSummary(sport: string, team_id: string) {
    // Fetch team summary data
    const teamSummaryData = await this.fetchTeamSummary(sport, team_id)

    // Create season repo instance
    const seasonRepo = new SeasonRepository()

    // Normalize game summaries
    const { completed_events, upcoming_events } = seasonRepo.normalizeSummaries(
      teamSummaryData?.summaries as any
    )

    // Parse team profile
    const profile = await this.teamProfile(sport, team_id)

    if (!profile) {
      return
    }

    const recent_events = this.calculateRecentEvents(
      profile?.competitor?.team_id,
      upcoming_events,
      completed_events
    )

    // All events
    const allCompetitions = [...upcoming_events, ...completed_events].flatMap(
      (x) => x.sport_event?.sport_event_context?.competition
    )

    // Competitions
    const uniqueCompetitionIds = [
      ...new Set(allCompetitions.flatMap((x) => x.league_id)),
    ]

    // Competitions
    const competitions = uniqueCompetitionIds
      ?.map((id) => allCompetitions?.find((x) => x.league_id === id))
      ?.filter(Boolean) as ILeague[]

    // Calculate stats
    const stats = new TeamStatRepository().teamLeagueStats(
      profile?.competitor?.team_id,
      completed_events
    )

    const summary: ITeamSummary = {
      completed_events,
      upcoming_events,
      profile,
      recent_events,
      competitions,
      stats,
    }

    return summary
  }

  async fetchTeamProfile(sport: string, team_id: string) {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const srTeamId = toSrId('competitor', team_id)

    const endpoint = savedGameApi.__DEFAULT__(
      `competitors/${srTeamId}/profile.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  normalizeTeamProfile(profile: ITeamProfile): ITeamProfile {
    // Normalize competitor
    const competitor = this.normalizeTeam(profile?.competitor)

    // Normalize category
    const category = new CategoryRepository().normalizeCategory(
      profile?.category
    )

    // Create player repository
    const playerRepo = new PlayerRepository()

    // Get Sport name from profile
    const sportName = profile?.sport?.name ?? 'futebol'

    // Normalize players
    const players = profile?.players?.map((x) =>
      playerRepo.normalizePlayer(sportName, x)
    )

    // Manager
    const manager = profile?.manager
      ? playerRepo.normalizePlayer(sportName, profile?.manager)
      : undefined

    // Total players
    const total_players = players?.length ?? 0

    // Home players
    const home_players =
      players?.filter((x) => x?.country_code === category?.country_code)
        .length ?? 0

    const normalizedProfile: ITeamProfile = {
      ...profile,
      competitor,
      category,
      players,
      manager,
      total_players,
      home_players,
      foreign_players: total_players - home_players,
    }

    return {
      ...normalizedProfile,
      summary_text: new TextRepository().teamProfileSummaryText(
        normalizedProfile
      ),
    }
  }

  async teamProfile(sport: string, team_id: string) {
    const profileData = await this.fetchTeamProfile(sport, team_id)

    if (!profileData) {
      return
    }

    return this.normalizeTeamProfile(profileData as any)
  }
}
