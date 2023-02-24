import { toKebabCase, toTitleCase } from '@corex/string-util'
import mostPopularData from 'src/data/most_popular_leagues.json'
import type {
  ICountryInfo,
  ILeague,
  ILeagueSummary,
  ISeason,
  ISportCategorySummary,
} from 'src/interface'
import { apiEndpoints, resolveCMS, toId, toSrId } from 'src/utils/api'
import { CategoryRepository } from './category-repository'
import { CountryRepository } from './country-repository'
import { SeasonRepository } from './season-repository'
import { TeamRepository } from './team-repository'
import { TextRepository } from './text-repository'
import parseISO from 'date-fns/parseISO'
import { normalizeImageFilename } from 'src/utils/string'

export class LeagueRepository {
  countryRepo = new CountryRepository()

  /**
   * Deprecated. Use LeagueRepository.getLeagueIconV2
   * @param countryInfo
   * @param name
   * @returns
   * @deprecated
   */
  getLeagueIcon(countryInfo?: ICountryInfo, name?: string) {
    if (!countryInfo?.name || !name) {
      return resolveCMS(`/season_fallback.png`)
    }

    // Init icon file name
    let iconFilename = `${countryInfo.name}_${name}`

    // Add continent info
    if (countryInfo?.continent) {
      iconFilename = `${countryInfo.continent}_${iconFilename}`
    }

    return resolveCMS(
      `/logos/leagues/${normalizeImageFilename(iconFilename)}.png`.toLowerCase()
    )
  }

  /**
   * Resolve league icon
   * @param league
   * @returns
   */
  getLeagueIconV2(league: ILeague) {
    const { country_info, league_id, name } = league

    // Handle fallback images
    if (!country_info?.name || !name) {
      return resolveCMS(`/season_fallback.png`)
    }

    return resolveCMS(`/logos/leagues-v2/${league_id}.png`.toLowerCase())
  }

  /**
   * Normalize league icon
   * @param countryInfo
   * @param league
   * @returns
   */
  normalizeLeague(countryInfo: ICountryInfo, league: ILeague): ILeague {
    // Extract id
    const league_id = toId(league?.id)!

    // Normalize league
    const normalizedLeague: ILeague = {
      ...league,
      league_id,
      slug: toKebabCase(league?.name ?? ''),
      country_info: countryInfo,
    }

    // Resolve league icon
    const icon = this.getLeagueIconV2(normalizedLeague)

    return {
      ...normalizedLeague,
      icon,
    }
  }

  async mostPopularLeagues(sport: string): Promise<ILeague[] | void> {
    // Extract endpoint
    const leagueData = (mostPopularData as any)[sport] as { leagues: ILeague[] }

    // Return if no league data exist
    if (!leagueData) {
      return
    }

    const leagues: ILeague[] = []

    for (const item of leagueData?.leagues) {
      const countryInfo = this.countryRepo.findCountryByName(item?.country)

      // Skip iteration if country info is empty
      if (!countryInfo) {
        continue
      }

      leagues.push(this.normalizeLeague(countryInfo, item))
    }

    return leagues
  }

  sortSeasonsByDate(seasons: ISeason[]) {
    return seasons?.sort(
      (a, b) =>
        new Date(b?.start_date).getTime() - new Date(a?.start_date).getTime()
    )
  }

  async fetchLeagueSeasons(
    sport: string,
    league_id: string
  ): Promise<{ seasons: ISeason[] } | undefined> {
    const savedGameApi = apiEndpoints[sport as any]

    if (!savedGameApi) {
      return
    }

    const srCompetitionId = toSrId('competition', `${league_id}`)

    const endpoint = savedGameApi.__DEFAULT__(
      `competitions/${srCompetitionId}/seasons.json`
    )

    const response = await fetch(endpoint)

    if (!response.ok) {
      return
    }

    return response.json()
  }

  async leagueSeasons(
    sport: string,
    category: string,
    league_id: string
  ): Promise<ISeason[] | undefined> {
    // Fetch league seasons
    const result = await this.fetchLeagueSeasons(sport, league_id)

    // Return if result is empty
    if (!result) {
      return
    }

    // Create season repo instance
    const seasonRepo = new SeasonRepository()

    // Category Name
    const categoryName = toTitleCase(category)

    // Normalize seasons
    const normalizedSeasons: ISeason[] = result?.seasons?.map((x) =>
      seasonRepo.normalizeSeason(x, categoryName)
    )

    return this.sortSeasonsByDate(normalizedSeasons)
  }

  async fetchCompetitionCategories(
    sport: string
  ): Promise<{ competitions: ILeague[] } | void> {
    // Extract endpoint
    const endpoint = apiEndpoints[sport]

    // Unknown category
    if (!endpoint?.competitions) {
      return
    }

    // Call endpoint
    const result = await fetch(endpoint?.competitions)

    // Extract result
    return await result.json()
  }

  /**
   * Normalize leagues
   * @param leagues
   * @returns
   */
  normalizeLeagues(leagues: ILeague[]) {
    // Create category repo instance
    const categoryRepo = new CategoryRepository()

    return leagues?.reduce((prev, curr) => {
      const category = categoryRepo.normalizeCategory(curr.category)

      const name = category?.name

      const slug = toKebabCase(name)

      const id = curr?.category?.id

      const country_info = this.countryRepo.findCountryByName(name)

      const competitions = prev[name]?.competitions?.map((x: any) =>
        this.normalizeLeague(country_info, x)
      )

      prev[name] = {
        ...(prev[name] ?? {}),
        id,
        category_id: toId(id),
        name,
        slug,
        country_info,
        competitions: [
          ...(competitions ?? []),
          this.normalizeLeague(country_info, {
            id: curr?.id,
            league_id: toId(curr?.id)!,
            name: curr?.name,
          } as any),
        ],
      }

      return prev
    }, {} as any)
  }

  /**
   * Fetch and generate competition categories
   * @param sport
   * @returns
   */
  async competitionCategories(
    sport: string
  ): Promise<ISportCategorySummary[] | void> {
    // Fetch competition categories
    const data = await this.fetchCompetitionCategories(sport)

    // Return if data is empty
    if (!data || !data?.competitions || data?.competitions?.length === 0) {
      return
    }

    // Normalize competitions
    const normalizedComps = this.normalizeLeagues(data?.competitions)

    // Add additional data to each competition
    const categoryArr = Object.keys(normalizedComps).reduce<any[]>(
      (prev, curr) => {
        const comp = normalizedComps[curr as any]

        prev.push({
          ...comp,
          competitions_count: comp?.competitions?.length ?? 0,
          latest_competition: comp?.competitions[0],
        })

        return prev
      },
      []
    ) as ISportCategorySummary[]

    // Sort category summaries
    return new CategoryRepository().sortCategorySummaries(categoryArr)
  }

  /**
   * Fetch league info
   * <API>/competitions/<league_id>/info.json
   * @param sport
   * @param league_id
   * @returns
   */
  async fetchLeagueInfo(
    sport: string,
    league_id: string
  ): Promise<{ competition?: ILeague } | undefined> {
    // Find api endpoint
    const sportAPi = apiEndpoints[sport]

    // Return if endpoint is null
    if (!sportAPi) {
      return
    }

    // Extract endpoint
    const endpoint = sportAPi.__DEFAULT__(
      `competitions/${toSrId('competition', league_id)}/info.json`
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
   * Generate league info
   * @param sport
   * @param category
   * @param league_id
   * @returns
   */
  async leagueInfo(
    sport: string,
    category: string,
    league_id: string
  ): Promise<ILeague | undefined> {
    // Fetch league
    const data = await this.fetchLeagueInfo(sport, league_id)

    // Return if data does not contain competition
    if (!data?.competition) {
      return
    }

    // Extract category name
    const categoryName = toTitleCase(category)

    // Find country info by category name
    const country_info = this.countryRepo.findCountryByName(categoryName)

    return this.normalizeLeague(country_info, data?.competition)
  }

  /**
   * Generates league summary
   * @param sport
   * @param category
   * @param league_id
   * @returns
   */
  async leagueSummary(
    sport: string,
    category: string,
    league_id: string
  ): Promise<ILeagueSummary | undefined> {
    // Fetch league info
    const league = await this.leagueInfo(sport, category, league_id)

    // Return if league is empty
    if (!league) {
      return
    }

    // Parse seasons
    const seasons = await this.leagueSeasons(sport, category, league_id)

    // Return if seasons are empty
    if (!seasons) {
      return
    }

    // Find current season
    const current_season = seasons?.find(
      (x) => new Date().getTime() > parseISO(x?.start_date).getTime()
    )

    // Return if current season is null
    if (!current_season) {
      return
    }

    // Parse current season teams
    const current_season_teams = await new TeamRepository().seasonTeams(
      sport,
      current_season?.season_id
    )

    // Return if no team data exist
    if (!current_season_teams) {
      return
    }

    // League summary
    const summary: ILeagueSummary = {
      league,
      sport,
      seasons,
      current_season,
      current_season_teams,
      summary_text: '',
    }

    return {
      ...summary,
      summary_text: new TextRepository().leagueSummaryText(summary),
    }
  }
}
