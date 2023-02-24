import { toKebabCase } from '@corex/string-util'
import { ISport } from 'src/interface'
import { toId } from 'src/utils/api'

export class SportRepository {
  normalizeSport(sport: ISport): ISport {
    return {
      ...sport,
      sport_id: toId(sport.id)!,
      slug: toKebabCase(sport?.name),
    }
  }
}
