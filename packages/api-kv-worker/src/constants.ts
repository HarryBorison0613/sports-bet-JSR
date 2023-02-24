import { endOfYear } from 'date-fns'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import endOfDay from 'date-fns/endOfDay'
import { utcToZonedTime } from 'date-fns-tz'

export const ENDPOINT_PATTERNS = {
  competitionInfo: '*/competitions/*/info.json',
  competitionSeasons: '*/competitions/*/seasons.json',
  seasonCompetitors: '*/seasons/*/competitors.json',
  scheduleSummaries: '*/schedules/*/summaries.json',
  competitions: '*/competitions.json',
  seasonStandings: '*/seasons/*/standings.json',
  seasonSummaries: '*/seasons/*/summaries.json',
  competitorSummaries: '*/competitors/*/summaries.json',
  competitorProfile: '*/competitors/*/profile.json',
  sportEventSummary: '*/sport_events/*/summary.json',
  competitorVersusCompetitor: '*/competitors/*/versus/*/summaries.json',
}

type TTLDuration = '1_min' | '1_day' | '1_year'

const getPTDate = () => utcToZonedTime(new Date(), 'America/Sao_Paulo')

export const TTL = (duration: TTLDuration) => {
  switch (duration) {
    case '1_day':
      return differenceInSeconds(endOfDay(getPTDate()), getPTDate())
    case '1_year':
      return differenceInSeconds(endOfYear(getPTDate()), getPTDate())
    case '1_min':
    default:
      return 60
  }
}
