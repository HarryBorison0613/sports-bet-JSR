import type { ILeague, ILeagueSummary, ITeam } from '@apps/www/src/interface'
import path from 'node:path'
import glob from 'fast-glob'
import fs from 'node:fs/promises'

export class RenameImage {
  /**
   * Source folder containing old team image files
   */
  teamSourceFolder = 'public/logos/teams'

  /**
   * Destination folder to save new team image files
   */
  teamDestFolder = 'public/logos/teams-v2'

  /**
   * Source folder containing old league image files
   */
  leagueSourceFolder = 'public/logos/leagues'

  /**
   * Destination folder to save new league image files
   */
  leagueDestFolder = 'public/logos/leagues-v2'

  /**
   * Generic logger
   * @param args
   */
  log(...args: string[]) {
    console.log(`[RenameImage]`, ...args)
  }

  /**
   * Resolve with project root
   * @param paths
   * @returns
   */
  withProjectRoot(...paths: string[]) {
    return path.resolve(__dirname, '../../../apps/www', ...paths)
  }

  /**
   * Extract file name from filepath
   * @param filePath
   * @returns
   */
  extractFilename(filePath: string) {
    return filePath?.split('/').pop()
  }

  /**
   *
   * @param pattern
   * @param id
   */
  async renameFile(destFolder: string, pattern: string[], id: string) {
    // Parse all files based on input pattern
    const files = await glob(pattern)

    for (const oldFilePath of files) {
      // New file name
      const newFilePath = this.withProjectRoot(destFolder, `${id}.png`)

      // Extract file names for logging
      const oldFileFile = this.extractFilename(oldFilePath)
      const newFileFile = this.extractFilename(newFilePath)

      await fs
        .copyFile(oldFilePath, newFilePath)
        .then(() => this.log(`✨ Success:`, oldFileFile, ' ===> ', newFileFile))
        .catch(() =>
          this.log('❗ Unable to rename:', oldFileFile, ' ===> ', newFileFile)
        )
    }
  }

  /**
   * Normalize text to remove special characters
   * @param text
   * @returns
   */
  normalizeImageFilename(text: string) {
    return text?.replace('/', ' ').toLowerCase()
  }

  /**
   * Rename team
   * @param teamName
   * @param id
   * @returns
   */
  async renameTeam(teamName: string, id: string) {
    // Normalize team name
    const normalizedTeamName = this.normalizeImageFilename(teamName)

    return this.renameFile(
      this.teamDestFolder,
      [
        this.withProjectRoot(
          this.teamSourceFolder,
          `${normalizedTeamName} *.png`.toLowerCase()
        ),
        this.withProjectRoot(
          this.teamSourceFolder,
          `${normalizedTeamName}.png`.toLowerCase()
        ),
      ],
      id
    )
  }

  /**
   * Parse json data from file
   * @param jsonFile
   * @returns
   */
  async parseJsonData<T>(jsonFile: string): Promise<T> {
    const content = await fs.readFile(jsonFile, { encoding: 'utf-8' })
    return JSON.parse(content ?? '{}')
  }

  /**
   * Find all cached league files
   * @returns
   */
  async getCachedLeagueFiles() {
    return glob(this.withProjectRoot('_prerender/api/**/leagues/*.json'))
  }

  /**
   * Load all team json data
   */
  async getAllTeams(cachedLeagues: string[]) {
    // All teams
    const allTeams: ITeam[] = []

    for (const jsonFile of cachedLeagues) {
      // Parse league summary
      const leagueSummary = await this.parseJsonData<ILeagueSummary>(jsonFile)

      // Run actions
      allTeams.push(...(leagueSummary?.current_season_teams ?? []))
    }

    return allTeams
  }

  /**
   * Load all team json data
   */
  async getAllLeagues(cachedLeagues: string[]) {
    // All teams
    const allCompetitions: ILeague[] = []

    for (const jsonFile of cachedLeagues) {
      // Parse league summary
      const leagueSummary = await this.parseJsonData<ILeagueSummary>(jsonFile)

      // Run actions
      allCompetitions.push(leagueSummary?.league)
    }

    return allCompetitions
  }

  /**
   * Rename league files
   * @param league
   * @returns
   */
  async renameLeague(league: ILeague) {
    // Init icon file name
    let leagueFileName = `${league?.country_info?.name}_${league?.name}`

    // Add continent info
    if (league?.country_info?.continent) {
      leagueFileName = `${league?.country_info?.continent}_${leagueFileName}`
    }

    // Normalize league filename
    leagueFileName = this.normalizeImageFilename(leagueFileName)

    return this.renameFile(
      this.leagueDestFolder,
      [
        // this.withProjectRoot(
        //   this.leagueSourceFolder,
        //   `${leagueFileName} *.png`.toLowerCase()
        // ),
        this.withProjectRoot(
          this.leagueSourceFolder,
          `${leagueFileName}.png`.toLowerCase()
        ),
      ],
      league?.league_id
    )
  }

  /**
   * Process images to rename teams and leagues
   */
  async process() {
    // Load all team json file data from leagues
    const cachedLeagues = await this.getCachedLeagueFiles()

    // Get all teams
    const allTeams = await this.getAllTeams(cachedLeagues)

    // Rename all team images
    for (const team of allTeams) {
      await this.renameTeam(team?.name, team?.team_id)
    }

    // Get all leagues
    const allLeagues = await this.getAllLeagues(cachedLeagues)

    // Rename all league images
    for (const league of allLeagues) {
      await this.renameLeague(league)
    }
  }
}
