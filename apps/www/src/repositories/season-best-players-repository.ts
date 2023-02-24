import { toKebabCase } from '@corex/string-util'
import type { IPlayer, ISportEventSummary } from 'src/interface'
import { sumObjects } from 'src/utils/obj'
import { TeamRepository } from './team-repository'

export class SeasonBestPlayersRepository {
  teamRepo = new TeamRepository()

  private allPlayers(summaries: ISportEventSummary[]) {
    return summaries?.reduce<IPlayer[]>((prev, curr) => {
      const all = curr?.statistics?.totals?.competitors?.flatMap(
        ({ players, statistics, form, ...restTeam }) => {
          return players?.map((player) => ({
            ...player,
            team: this.teamRepo.normalizeTeam(restTeam as any),
          }))
        }
      )

      prev.push(...(all ?? []))

      return prev
    }, [])
  }

  /**
   * Returns a unique array of player by combining player stats
   * @param players
   * @returns
   */
  combinePlayers(players: IPlayer[]) {
    const combined = players?.reduce<{ [key: string]: IPlayer }>(
      (prev, curr) => {
        // Extract id
        const id = curr?.id

        // No id return prev object
        if (!id) {
          return prev
        }

        // Add to object
        prev[id] = {
          ...(prev[id] ?? {}),
          ...curr,
          statistics: sumObjects(
            prev[id]?.statistics ?? {},
            curr?.statistics ?? {}
          ),
        }

        return prev
      },
      {}
    )

    return Object.values(combined)
  }

  /**
   * Compare and soccer players
   * @returns
   */
  soccerCompareFn() {
    // Simple logic to add multiple params to determine rank
    const soccerRank = ({ statistics = {} }: IPlayer = {} as any) =>
      (statistics?.assists ?? 0) +
      (statistics?.shots_blocked ?? 0) +
      (statistics?.shots_on_target ?? 0) +
      (statistics?.goals_scored ?? 0)

    return (a: IPlayer, b: IPlayer) => soccerRank(b) - soccerRank(a)
  }

  /**
   * Compare basketball players
   * @returns
   */
  basketballCompareFn() {
    return (a: IPlayer, b: IPlayer) =>
      b?.statistics?.points - a?.statistics?.points
  }

  /**
   * Compare ice-hockey players
   * @returns
   */
  iceHockeyCompareFn() {
    return (a: IPlayer, b: IPlayer) =>
      b?.statistics?.points - a?.statistics?.points
  }

  getSortCompareFn(sport: string) {
    switch (sport) {
      case 'futebol':
        return this.soccerCompareFn()
      case 'basquetebol':
        return this.basketballCompareFn()
      case 'hóquei-no-gelo':
        return this.iceHockeyCompareFn()
      default:
        return
    }
  }

  bestPlayers(summaries: ISportEventSummary[]): IPlayer[] {
    // Extract current sport
    const sport = toKebabCase(
      summaries[0]?.sport_event?.sport_event_context?.sport?.name
    )

    // Extract all players
    const players = this.allPlayers(summaries)

    // Combine player data
    const combinedPlayers = this.combinePlayers(players)

    // Sort predicate
    const sortCompareFn = this.getSortCompareFn(sport)

    // No sort predicate return
    if (!sortCompareFn) {
      return []
    }

    // Sort players
    const sortedPlayers = combinedPlayers?.sort(sortCompareFn)

    // Pick first 10 and return
    return sortedPlayers?.slice(0, 10)
  }
}
