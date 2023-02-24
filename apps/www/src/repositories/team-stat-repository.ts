import type {
  ISportEventSummary,
  ITeamLeagueStat,
  ITeamLeagueStatGroup,
} from 'src/interface'
import { sumObjects } from 'src/utils/obj'

export class TeamStatRepository {
  /**
   * Group general stats
   * @param stat
   * @returns
   */
  groupGeneralStat(stat: any) {
    return {
      general: {
        ...(stat ?? {}),
      },
    }
  }

  /**
   * Group soccer stats
   * @param stat
   * @returns
   */
  groupSoccerStat(stat: any) {
    const {
      total_matches,
      ball_possession,
      cards_given,
      corner_kicks,
      fouls,
      substitutions,
      throw_ins,
      yellow_cards,
      red_cards,
      yellow_red_cards,
      injuries,
      offsides,
      shots_blocked,
      shots_off_target,
      shots_on_target,
      shots_saved,
      shots_total,
      free_kicks,
      goal_kicks,
    } = stat

    return {
      general: {
        total_matches,
        substitutions,
        ball_possession,
        injuries,
        throw_ins,
        corner_kicks,
        free_kicks,
        goal_kicks,
      },
      shots: {
        shots_blocked,
        shots_off_target,
        shots_on_target,
        shots_saved,
        shots_total,
      },
      fouls: {
        fouls,
        offsides,
        cards_given,
        yellow_cards,
        red_cards,
        yellow_red_cards,
      },
    }
  }

  /**
   * Group basketball stats
   */
  groupBasketballStat(stat: any) {
    const {
      total_matches,
      assists,
      ball_possession,
      biggest_lead,
      defensive_rebounds,
      fouls,
      free_throw_attempts_successful,
      free_throw_attempts_total,
      offensive_rebounds,
      rebounds,
      shots_blocked,
      steals,
      team_leads,
      team_rebounds,
      team_turnovers,
      three_point_attempts_successful,
      three_point_attempts_total,
      time_spent_in_lead,
      timeouts,
      turnovers,
      two_point_attempts_successful,
      two_point_attempts_total,
    } = stat

    return {
      general: {
        total_matches,
        ball_possession,
        assists,
        biggest_lead,
        shots_blocked,
        steals,
        team_leads,
        time_spent_in_lead,
        timeouts,
        turnovers,
      },
      team: {
        team_rebounds,
        team_turnovers,
      },
      rebounds: {
        rebounds,
        offensive_rebounds,
        defensive_rebounds,
      },
      free_throw_attempts: {
        free_throw_attempts_successful,
        free_throw_attempts_total,
      },
      two_point_attempts: {
        two_point_attempts_successful,
        two_point_attempts_total,
      },
      three_point_attempts: {
        three_point_attempts_successful,
        three_point_attempts_total,
      },
      fouls: {
        fouls,
      },
    }
  }

  /**
   * Group ice hockey stats
   * @param stat
   */
  groupIceHockeyStat(stat: any) {
    const {
      goals_conceded,
      goals_in_power_play,
      goals_while_short_handed,
      penalties,
      penalty_minutes,
      power_plays,
      puck_possession,
      saves,
      shots_on_goal,
      shutouts,
      total_matches,
    } = stat

    return {
      general: { total_matches, power_plays, puck_possession, shutouts },
      goals: {
        saves,
        shots_on_goal,
        goals_conceded,
        goals_in_power_play,
        goals_while_short_handed,
      },
      penalty: {
        penalties,
        penalty_minutes,
      },
    }
  }

  /**
   * Generic league stat builder
   * @param stats
   * @param resolver
   * @returns
   */
  createGenericLeagueStat(
    stats: ITeamLeagueStat,
    resolver: (stat: any) => any
  ): ITeamLeagueStat | undefined {
    return Object.keys(stats).reduce<any>((prev, curr) => {
      prev[curr] = resolver(stats[curr])
      return prev
    }, {})
  }

  /**
   * League stat normalizer
   * @param sport
   * @param stats
   * @returns
   */
  normalizeLeagueStats(
    sport: string,
    stats: ITeamLeagueStat
  ): ITeamLeagueStat | undefined {
    switch (sport) {
      case 'futebol':
        return this.createGenericLeagueStat(stats, (x) =>
          this.groupSoccerStat(x)
        )
      case 'basquetebol':
        return this.createGenericLeagueStat(stats, (x) =>
          this.groupBasketballStat(x)
        )
      case 'hóquei-no-gelo':
        return this.createGenericLeagueStat(stats, (x) =>
          this.groupIceHockeyStat(x)
        )
      default:
        return this.createGenericLeagueStat(stats, (x) =>
          this.groupGeneralStat(x)
        )
    }
  }

  teamLeagueStats(
    team_id: string,
    completed_events: ISportEventSummary[]
  ): ITeamLeagueStat | undefined {
    // Find the sport
    const sport =
      completed_events[0]?.sport_event?.sport_event_context?.sport?.slug

    // No sport exist, return
    if (!sport) {
      return
    }

    const stats = completed_events?.reduce<ITeamLeagueStat>((prev, curr) => {
      // Extract league id
      const leagueId =
        curr?.sport_event?.sport_event_context?.competition?.league_id

      // No league id return
      if (!leagueId) {
        return prev
      }

      // Find current team totals
      const currentTeam = curr?.statistics?.totals?.competitors?.find(
        (x) => x?.team_id === team_id
      )

      // No current team return
      if (!currentTeam) {
        return prev
      }

      // Fill value
      prev[leagueId] = sumObjects(prev[leagueId] ?? {}, currentTeam?.statistics)

      // Keep track of total matches
      prev[leagueId].total_matches =
        ((prev[leagueId].total_matches as unknown as any) ?? 0) + 1

      return prev
    }, {})

    return this.normalizeLeagueStats(sport, stats)
  }
}
