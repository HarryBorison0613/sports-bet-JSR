import { toKebabCase } from '@corex/string-util'
import type { IPlayer } from 'src/interface'
import { resolveCMS, toId } from 'src/utils/api'
import { calculateAge } from 'src/utils/date'
import { CountryRepository } from './country-repository'
import playerPositionPt from 'src/data/player_position_pt.json'

export class PlayerRepository {
  countryRepo = new CountryRepository()

  getTranslatedPlayerType(sport: string, type: string): string {
    const position = (playerPositionPt as any)[`${sport}`.toLowerCase()]

    return (
      position?.find(
        (x: any) => x?.engPosition?.toLowerCase() === type?.toLowerCase()
      )?.ptPosition ?? type
    )
  }

  normalizePlayer(sport: string, player: IPlayer): IPlayer {
    const country_info = this.countryRepo?.findCountryByCode(
      player?.country_code
    )

    const age_in_years = calculateAge(player?.date_of_birth)

    const icon = resolveCMS('/avatar.png')

    return {
      ...player,
      player_id: toId(player?.id)!,
      slug: toKebabCase(player?.name ?? ''),
      name: player?.name?.split(',')?.reverse()?.join(' '),
      country_info,
      age_in_years,
      icon,
      type: this.getTranslatedPlayerType(sport, player?.type),
    }
  }
}
