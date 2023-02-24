import { useRouter } from 'next/router'
import React from 'react'
import type { ILeague, ISeason, ISportEvent, ITeam } from 'src/interface'
import type { Url } from 'url'

const useCreateHref = () => {
  const { query, push } = useRouter()

  const createLeagueHref = React.useCallback(
    (competition: ILeague) => {
      return {
        pathname: '/[sport]/[category]/[league_id]',
        query: {
          sport: query?.sport,
          category: query?.category,
          league_id: competition?.league_id,
        },
      } as Partial<Url>
    },
    [query?.category, query?.sport]
  )

  const createGameHref = React.useCallback(
    (event: ISportEvent) => {
      return {
        pathname:
          '/[sport]/[category]/[league_id]/[season_slug]/[season_id]/jogos/[game_id]',
        query: {
          sport: query?.sport,
          category: event?.sport_event_context?.category?.slug,
          league_id: event?.sport_event_context?.competition?.league_id,
          season_slug: event?.sport_event_context?.season?.slug,
          season_id: event?.sport_event_context?.season?.season_id,
          game_id: event?.sport_event_id,
        },
      } as Partial<Url>
    },
    [query?.sport]
  )

  const createTeamHref = React.useCallback(
    (team: ITeam, season: ISeason) => {
      return {
        pathname:
          '/[sport]/[category]/[league_id]/[season_slug]/[season_id]/times/[team_slug]/[team_id]',
        query: {
          team_id: team?.team_id,
          team_slug: team?.slug,
          season_id: season?.season_id,
          season_slug: season?.slug,
          league_id: season?.league_id,
          sport: query?.sport as string,
          category: query?.category as string,
        },
      } as Partial<Url>
    },
    [query?.category, query?.sport]
  )

  const createSeasonHref = React.useCallback(
    (season: ISeason) => {
      return {
        pathname: '/[sport]/[category]/[league_id]/[season_slug]/[season_id]',
        query: {
          sport: query?.sport,
          category: season?.country_info?.slug,
          league_id: season?.league_id,
          season_slug: season?.slug,
          season_id: season?.season_id,
        },
      } as Partial<Url>
    },
    [query?.sport]
  )

  const teamHrefArguments = React.useCallback(
    (item:any, teamNr:any) => {
      return {
        pathname:
          '/[sport]/[category]/[league_id]/[season_slug]/[season_id]/times/[team_slug]/[team_id]',
        query: {
        team_id: item.sport_event.competitors[teamNr].id,
        team_slug: item.sport_event.competitors[teamNr].slug,
        season_id: item.sport_event?.sport_event_context?.season.season_id,
        season_slug: item.sport_event?.sport_event_context?.season.slug,
        league_id: item.sport_event?.sport_event_context?.season.league_id,
        sport: item.sport_event.sport_event_context.sport.slug,
        category: item.sport_event.sport_event_context.category.slug,
        },
      } as Partial<Url>
    },
    [query?.category, query?.sport]
  )

  const seasonHrefArguments = React.useCallback(
    (item:any) => {
      return {
        pathname: '/[sport]/[category]/[league_id]/[season_slug]/[season_id]',
        query: {
          sport: item.sport_event.sport_event_context.sport.slug,
          category: item.sport_event.sport_event_context.category.slug,
          league_id: item.sport_event?.sport_event_context?.season.league_id,
          season_slug: item.sport_event?.sport_event_context?.season.slug,
          season_id: item.sport_event?.sport_event_context?.season.season_id,
        },
      } as Partial<Url>
    },
    [query?.sport]
  )

  return {
    createGameHref,
    query,
    push,
    createTeamHref,
    createSeasonHref,
    createLeagueHref,
    teamHrefArguments,
    seasonHrefArguments,
  }
}

export default useCreateHref
