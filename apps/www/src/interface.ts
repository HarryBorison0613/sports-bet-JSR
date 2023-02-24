import classNames from 'classnames'
import { NextSeoProps } from 'next-seo'

export interface ITwitterAuthor {
  name: string
  username: string
  id: string
  profile_image_url: string
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface ITweetMetric {
  retweet_count: number
  reply_count: number
  like_count: number
  quote_count: number
}

export interface ITweet {
  author_id: string
  id: string
  text: string
  created_at: string
  author: ITwitterAuthor
  public_metrics: ITweetMetric
  timeSince: string
}

export interface ICountryInfo {
  id: number
  continent: string
  name: string
  alpha2: string
  alpha3: string
  slug: string
  icon: string
}

export interface ICategory {
  id: string
  name: string
  country_code: string
  category_id: string
  slug: string
  country_info: ICountryInfo
}

export interface ILeague {
  gender: string
  id: string
  country: string
  name: string
  league_id: string
  category: ICategory
  slug: string
  icon: string
  country_info?: ICountryInfo
  current_season?: ISeason
}

export interface ISeason {
  icon: string
  name: string
  id: string
  league_id: string
  start_date: string
  start_date_formatted: string
  end_date_formatted: string
  end_date: string
  season_progress: number
  year: string
  competition_id: string
  season_id: string
  slug: string
  league_name: string
  country_info: ICountryInfo
}

export interface ITeamStatistics {
  ball_possession?: number
  cards_given?: number
  corner_kicks?: number
  fouls?: number
  free_kicks?: number
  goal_kicks?: number
  injuries?: number
  offsides?: number
  red_cards?: number
  shots_blocked?: number
  shots_off_target?: number
  shots_on_target?: number
  shots_saved?: number
  shots_total?: number
  substitutions?: number
  throw_ins?: number
  yellow_cards?: number
  yellow_red_cards?: number
}

export interface ITeam {
  gender: string
  slug: string
  id: string
  team_id: string
  name: string
  short_name: string
  abbreviation: string
  icon: string
  qualifier: string
  statistics: ITeamStatistics
  players: IPlayer[]
  form: string[]
}

export interface IPlayer {
  id: string
  name: string
  rank?: number
  team: ITeam
}

export interface ISportCategorySummary {
  id: string
  name: string
  category_id: string
  competitions: ILeague[]
  competitions_count: number
  latest_competition: ILeague
  slug: string
  country_info: ICountryInfo
}

export interface ISport {
  id: string
  name: string
  sport_id: string
  slug: string
}

export interface ISportEventContext {
  sport: ISport
  season: ISeason
  competition: ILeague
  category: ICategory
}

export interface ISportEvent {
  id: string
  sport_event_id?: string
  start_time: string
  start_time_formatted: string
  start_date_formatted: string
  competitors: ITeam[]
  sport_event_context: ISportEventContext
}

export type ISportEventStatusType = 'not_started' | 'closed' | 'live'

export type ISportEventMatchStatusType =
  | 'not_started'
  | 'ended'
  | '1st_half'
  | '2nd_half'
  | 'overtime'

export interface ISportEventStatus {
  clock: {
    played: string
  }
  start_time_formatted: string
  home_score: number
  away_score: number
  status: ISportEventStatusType
  match_status: ISportEventMatchStatusType
  winner_id?: string
  match_tie?: boolean
}

export interface ISportEventStatistics {
  totals: {
    competitors: ITeam[]
  }
}

export interface ISportEventSummary {
  id: string
  sport_event_status: ISportEventStatus
  sport_event: ISportEvent
  statistics: ISportEventStatistics
}

export interface ILeagueSummary {
  league: ILeague
  sport: string
  seasons: ISeason[]
  current_season: ISeason
  summary_text: string
  current_season_teams: ITeam[]
}

export interface ISeasonSummary {
  sport_event_context: ISportEventContext
  upcoming_events: ISportEventSummary[]
  completed_events: ISportEventSummary[]
  season_summary_text?: string
  teams: ITeam[]
  best_players: IPlayer[]
  all_seasons: ISeason[]
}

export interface IGameSummary {
  sport_event: ISportEvent
  sport_event_status: ISportEventStatus
  statistics: ISportEventStatistics
  home_vs_away: ITeamVsTeam
  home_profile?: ITeamProfile
  away_profile?: ITeamProfile
}

export interface ITeamVsTeam {
  last_meetings: IGameSummary[]
  next_meetings: IGameSummary[]
}

export interface IGhostPost {
  id: string
  title: string
  slug: string
  feature_image: string
  published_at: string
  formatted_time: string
}

export type ISeasonStandingType =
  | 'total'
  | 'home'
  | 'away'
  | 'first_half_total'
  | 'first_half_home'
  | 'first_half_away'
  | 'second_half_total'
  | 'second_half_home'
  | 'second_half_away'

export interface ISeasonStandingGroupStanding {
  runs_against: number
  runs_for: number
  points_against: number
  points_for: number
  rank: number
  played: number
  win: number
  loss: number
  draw: number
  goals_for: number
  goals_against: number
  goals_diff: number
  points: number
  current_outcome: string
  change: number
  points_per_game: number
  competitor: ITeam
  streak: string
  streak_formatted?: string[]
  last_ten_win_record?: number
  last_ten_loss_record?: number
}

export interface ISeasonStandingGroup {
  id: string
  group_id: string
  name: string
  live: boolean
  standings: ISeasonStandingGroupStanding[]
}

export interface ISeasonStanding {
  type: ISeasonStandingType
  tie_break_rule: string
  points_win: number
  points_draw: number
  points_loss: number
  round: number
  groups: ISeasonStandingGroup[]
}

export interface ISeasonStandingTypeStatistics {
  goals?: number
  draw?: number
  win?: number
  points?: number
  yellow_cards?: number
  total_competitors?: number
}

export interface ISeasonStandingStatistics {
  total: ISeasonStandingTypeStatistics
  home: ISeasonStandingTypeStatistics
  away: ISeasonStandingTypeStatistics
  home_win_percentage: number
  away_win_percentage: number
  draw_percentage: number
  top_competitors: ITeam[]
}

export interface ISeasonStandingSummary {
  standings: ISeasonStanding[]
  statistics: ISeasonStandingStatistics
}

export interface IRecentSportEventSummary {
  sport_event_id: string
  status: ISportEventStatusType
  start_time_formatted: string
  start_date_formatted: string
  team: ITeam
  vs: ITeam
  teamScore: number
  vsScore: number
  match_status: ISportEventMatchStatusType
  match_tie?: boolean
  match_result: string
  event: ISportEvent
}

export interface ITeamLeagueStatGroup {
  [key: string]: {
    [key: string]: any
  }
}

export interface ITeamLeagueStat {
  [league_id: string]: ITeamLeagueStatGroup
}

export interface ITeamSummary {
  profile: ITeamProfile
  upcoming_events: ISportEventSummary[]
  completed_events: ISportEventSummary[]
  competitions: ILeague[]
  recent_events: IRecentSportEventSummary[]
  stats?: ITeamLeagueStat
}

export interface IVenue {
  name: string
  id: string
  venue_id: string
  capacity: number
  city_name: string
  country_name: string
  map_coordinates: string
  country_code: string
}

export interface IJersey {
  type: 'home'
}

export interface ITeamProfile {
  sport: ISport
  competitor: ITeam
  category: ICategory
  players: IPlayer[]
  manager?: IPlayer
  venue: IVenue
  summary_text?: string
  jerseys: IJersey[]
  total_players: number
  foreign_players: number
  home_players: number
}

export interface IPlayer {
  id: string
  player_id: string
  type: string
  date_of_birth: string
  age_in_years: number
  nationality: string
  country_code: string
  height: number
  weight: number
  jersey_number: number
  preferred_foot: string
  gender: string
  slug: string
  country_info: ICountryInfo
  icon: string
  statistics?: any
}

export interface IPageSEOProps {
  seo: NextSeoProps
}

export interface IPrerenderAllCategoriesResponse {
  [sport: string]: ISportCategorySummary[]
}

export interface ISportCategoryPathParams {
  sport: string
  category: string
  league_id: string
}

export interface ISportCategoryPaths {
  params: ISportCategoryPathParams
}

export type ISeasonPathsParams = ISportCategoryPathParams & {
  season_slug: string
  season_id: string
}

export interface ISeasonPaths {
  params: ISeasonPathsParams
}

export type ITeamPathParams = ISeasonPathsParams & {
  team_slug: string
  team_id: string
}

export interface ITeamPaths {
  params: ITeamPathParams
}

export interface ILoginParams {
  username?: string
  password?: string
}

export interface IProfileParams {
  editName: string
  userName: string
  email: string
  newPassword: string
  confirmPassword: string
}
export interface IFetchWrapperParams {
  url?: string
  body?: object
}

export interface IInputTextFeildParams {
  name: string
  label: string
  error: string
  type: string
  onChange: any
  id: string
  htmlFor: string
  style: any
  margin: any
  value?: string
  disable: Boolean
}
