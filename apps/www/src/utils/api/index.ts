type MethodType = (args: string) => string

export interface IEndpoint {
  __DEFAULT__: MethodType
  competitions: string
  competitionSeasons?: MethodType
  competitors?: MethodType
}

export interface IApiEndpointCollection {
  [key: string]: IEndpoint
}

const {
  BASKETBALL_API_KEY,
  SOCCER_API_KEY,
  AMERICAN_FOOTBALL_KEY,
  BASEBALL_API_KEY,
  ICE_HOCKEY_API_KEY,
  TENNIS_API_KEY,
  SPORTS_API_MODE,
  SPORTS_API_BASE_URL,
} = process.env

const buildEndpoint = (
  sport: string,
  version: string,
  rest: string,
  apiKey: string
) =>
  `${SPORTS_API_BASE_URL}/${sport}/${SPORTS_API_MODE}/${version}/br/${rest}?api_key=${apiKey}`

export const buildFootballEndpoint = (endpoint: string) =>
  buildEndpoint('soccer', 'v4', endpoint, SOCCER_API_KEY as string)

export const buildBasketballEndpoint = (endpoint: string) =>
  buildEndpoint('basketball', 'v2', endpoint, BASKETBALL_API_KEY as string)

export const buildAmericanFootballEndpoint = (endpoint: string) =>
  buildEndpoint(
    'americanfootball',
    'v2',
    endpoint,
    AMERICAN_FOOTBALL_KEY as string
  )

const buildBaseballEndpoint = (endpoint: string) =>
  buildEndpoint('baseball', 'v2', endpoint, BASEBALL_API_KEY as string)

const buildIceHockeyEndpoint = (endpoint: string) =>
  buildEndpoint('icehockey', 'v2', endpoint, ICE_HOCKEY_API_KEY as string)

const buildTennisEndpoint = (endpoint: string) =>
  buildEndpoint('tennis', 'v3', endpoint, TENNIS_API_KEY as string)

export const apiEndpoints: IApiEndpointCollection = {
  futebol: {
    competitions: buildFootballEndpoint('competitions.json'),
    __DEFAULT__: buildFootballEndpoint,
  },
  basquete: {
    competitions: buildBasketballEndpoint('competitions.json'),
    __DEFAULT__: buildBasketballEndpoint,
  },
  'futebol-americano': {
    competitions: buildAmericanFootballEndpoint('competitions.json'),
    __DEFAULT__: buildAmericanFootballEndpoint,
  },
  beisebol: {
    competitions: buildBaseballEndpoint('competitions.json'),
    __DEFAULT__: buildBaseballEndpoint,
  },
  'hockey-no-gelo': {
    competitions: buildIceHockeyEndpoint('competitions.json'),
    __DEFAULT__: buildIceHockeyEndpoint,
  },
  tênis: {
    competitions: buildTennisEndpoint('competitions.json'),
    __DEFAULT__: buildTennisEndpoint,
  },
}

export const resolveCMS = (filename: string) => filename

export type ISrIdType = 'competition' | 'season' | 'sport_event' | 'competitor'

export const toSrId = (path: ISrIdType, value: string) => `sr:${path}:${value}`

export const toId = (srId: string) => srId?.split(':').pop()
