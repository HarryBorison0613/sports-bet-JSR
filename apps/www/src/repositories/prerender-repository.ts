import path from 'node:path'
import fs from 'node:fs/promises'
import type {
  IGameSummary,
  ILeagueSummary,
  IPrerenderAllCategoriesResponse,
  ISeasonPaths,
  ISeasonStandingSummary,
  ISeasonSummary,
  ISportCategoryPaths,
  ISportCategorySummary,
  ITeamPaths,
  ITeamSummary,
} from 'src/interface'
import { sports } from 'src/constants'
import fetch from 'node-fetch'

export class PrerenderRepository {
  cache: boolean

  constructor(cache: boolean) {
    this.cache = cache
  }

  /**
   * Convert API endpoint to file path
   * @param endpoint
   * @returns
   */
  endpointToFilePath(endpoint: string) {
    return path.resolve(process.cwd(), `_prerender/${endpoint}.json`)
  }

  /**
   * Log pre-render repo contents
   * @param messages
   * @returns
   */
  log(...messages: any[]) {
    return console.log('✨', `[PRERENDER_REPO]`, ...messages)
  }

  /**
   * Save file
   * @param endpoint
   * @param content
   * @returns
   */
  async saveFile(endpoint: string, content: any) {
    // Create file path
    const filePath = this.endpointToFilePath(endpoint)

    // Find the directory name
    const dirName = path.dirname(filePath)

    // Check directory exist or not
    const dirExist = await fs.access(dirName).catch(() => false)

    // Make directory if not exist
    if (!dirExist) {
      await fs.mkdir(dirName, { recursive: true })
    }

    // Save
    return fs.writeFile(filePath, JSON.stringify(content ?? {}))
  }

  /**
   * Fetch data from API
   * @param endpoint
   * @returns
   */
  async fetchData<T>(endpoint: string): Promise<T | undefined> {
    // Create api endpoint
    const apiEndpoint = `https://www.bets.com.br${endpoint}`

    // Log activity
    this.log('Fetching data from API', apiEndpoint)

    // Call endpoint
    const result = await fetch(apiEndpoint)

    // Handle error
    if (!result.ok) {
      return
    }

    // Content
    return result.json().catch(() => {}) as any
  }

  /**
   * Load content from local cache
   * @param endpoint
   * @returns
   */
  async loadFromCache<T>(endpoint: string): Promise<T | undefined> {
    // Return if cache is not defined
    if (!this.cache) {
      return
    }

    // File path
    const filePath = this.endpointToFilePath(endpoint)

    // Check file exist
    const fileExist = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false)

    // Return if file does not exist
    if (!fileExist) {
      return
    }

    // Log activity
    this.log('Loading from cache, key:', endpoint)

    const content = await fs.readFile(filePath, { encoding: 'utf-8' })

    return JSON.parse(content)
  }

  /**
   * Fetch content from API and add it to local cache
   * @param endpoint
   * @returns
   */
  async fetchAndSave<T>(endpoint: string): Promise<T | undefined> {
    // Load cached content
    const cachedContent = await this.loadFromCache<T>(endpoint)

    // Return cached content
    if (cachedContent) {
      return cachedContent
    }

    // Fetch data
    const content = await this.fetchData<T>(endpoint)

    // Save file
    if (this.cache) {
      await this.saveFile(endpoint, content)
    }

    return content
  }

  async sportCategories(
    sport: string
  ): Promise<ISportCategorySummary[] | undefined> {
    return this.fetchAndSave<ISportCategorySummary[]>(
      `/api/${sport}/categories`
    )
  }

  async allCategories(): Promise<IPrerenderAllCategoriesResponse> {
    //Create summary array instance
    const response: IPrerenderAllCategoriesResponse = {}

    // Iterate and save all categories
    for (const sport of sports) {
      const categories = await this.sportCategories(sport)

      if (!categories) {
        continue
      }

      response[sport] = categories
    }

    return response
  }

  /**
   * League summary
   * @param sport
   * @param category
   * @param league_id
   * @returns
   */
  async leagueSummary(sport: string, category: string, league_id: string) {
    const endpoint = `/api/${sport}/${category}/leagues/${league_id}`
    return this.fetchAndSave<ILeagueSummary>(endpoint)
  }

  /**
   * Season summary
   * @param sport
   * @param season_id
   * @returns
   */
  async seasonSummary(sport: string, season_id: string) {
    const endpoint = `/api/${sport}/seasons/${season_id}`
    return this.fetchAndSave<ISeasonSummary>(endpoint)
  }

  /**
   * Season summary
   * @param sport
   * @param season_id
   * @returns
   */
  async seasonStandingSummary(sport: string, season_id: string) {
    const endpoint = `/api/${sport}/seasons/${season_id}/standings`
    return this.fetchAndSave<ISeasonStandingSummary>(endpoint)
  }

  /**
   * Team summary
   * @param sport
   * @param team_id
   * @returns
   */
  async teamSummary(sport: string, team_id: string) {
    const endpoint = `/api/${sport}/teams/${team_id}`
    return this.fetchAndSave<ITeamSummary>(endpoint)
  }

  /**
   * Game Summary
   * @param sport
   * @param game_id
   * @returns
   */
  async gameSummary(sport: string, game_id: string) {
    const endpoint = `/api/${sport}/games/${game_id}`
    return this.fetchAndSave<IGameSummary>(endpoint)
  }

  /**
   * Returns all sport category params for static rendering
   * @returns
   */
  async getSportCategoryPaths(): Promise<ISportCategoryPaths[]> {
    const allCategories = await this.allCategories()

    return Object.keys(allCategories).flatMap((sport) => {
      const categories = allCategories[sport]

      return categories?.reduce<ISportCategoryPaths[]>((prev, curr) => {
        const categorySlug = curr.slug

        for (const item of curr.competitions) {
          prev.push({
            params: {
              sport,
              category: categorySlug,
              league_id: item?.league_id,
            },
          })
        }

        return prev
      }, [])
    })
  }

  /**
   * Returns all sport category params for static rendering
   * @returns
   */
  async getSeasonPaths(): Promise<ISeasonPaths[]> {
    // All sport category paths
    const sportCategoryPaths = await this.getSportCategoryPaths()

    // Normalize all sport category paths
    const sportCategoryParams = sportCategoryPaths.flatMap((x) => x.params)

    // Season path array
    const seasonPaths: ISeasonPaths[] = []

    // Iterate over all sport category params
    for (const item of sportCategoryParams) {
      // Fetch league summary
      const leagueSummary = await this.leagueSummary(
        item?.sport,
        item?.category,
        item?.league_id
      )

      // Continue if league summary is empty
      if (!leagueSummary?.seasons) {
        continue
      }

      // Create league season paths
      const leagueSeasonPaths = leagueSummary?.seasons?.reduce<ISeasonPaths[]>(
        (prev, curr) => {
          prev.push({
            params: {
              ...item,
              season_id: curr?.season_id,
              season_slug: curr?.slug,
            },
          })

          return prev
        },
        []
      )

      // Push to season paths
      seasonPaths.push(...leagueSeasonPaths)
    }

    return seasonPaths.filter((x) => x?.params)
  }

  async getTeamPaths(): Promise<ITeamPaths[]> {
    {
      // Find all team paths
      const seasonPaths = await this.getSeasonPaths()

      // Convert all paths to params array
      const seasonPathParams = seasonPaths?.flatMap((x) => x.params) ?? []

      // Init team paths
      const teamPaths: ITeamPaths[] = []

      // Iterate over all season path params and load season summary
      for (const item of seasonPathParams) {
        // Find season summary
        const seasonSummary = await this.seasonSummary(
          item.sport,
          item.season_id
        )

        // Add all teams to teamPaths entry
        seasonSummary?.teams?.forEach((team) =>
          teamPaths.push({
            params: {
              ...item,
              team_id: team?.team_id,
              team_slug: team?.slug,
            },
          })
        )
      }

      return teamPaths
    }
  }
}
