import React from 'react'
import { ITabBarButtonProps } from 'src/components/TabBarButton/TabBarButton'
import { useRouter } from 'next/router'
import { SoccerIcon } from 'src/icons/soccer'
import { BasketBallIcon } from 'src/icons/basketball'
import { FootballIcon } from 'src/icons/football'
import { HockeyIcon } from 'src/icons/hockey'
import { BaseBallIcon } from 'src/icons/baseball'

const useSportTabBar = () => {
  const { query, pathname } = useRouter()

  const isViVoRoute = React.useMemo(() => pathname.endsWith('vivo'), [pathname])

  const items = React.useMemo<ITabBarButtonProps[]>(() => {
    const tabs: Partial<ITabBarButtonProps>[] = [
      {
        label: 'Futebol',
        Icon: SoccerIcon,
        query: {
          sport: 'futebol',
          category: 'brasil',
          league_id: '325',
        },
      },
      {
        label: 'Basquete',
        Icon: BasketBallIcon,
        query: {
          sport: 'basquete',
          category: 'estados-unidos-da-américa',
          league_id: '132',
        },
      },
      // {
      //   label: 'Tênis',
      //   query: {
      //     sport: 'tênis',
      //     category: 'internacional',
      //   },
      // },
      {
        label: 'Futebol Americano',
        Icon: FootballIcon,
        query: {
          sport: 'futebol-americano',
          category: 'estados-unidos-da-américa',
          league_id: '31',
        },
      },
      {
        label: 'Hockey no gelo',
        Icon: HockeyIcon,
        query: {
          sport: 'hockey-no-gelo',
          category: 'estados-unidos-da-américa',
          league_id: '234',
        },
      },
      {
        label: 'Beisebol',
        Icon: BaseBallIcon,
        query: {
          sport: 'beisebol',
          category: 'estados-unidos-da-américa',
          league_id: '109',
        },
      },
    ]

    return (tabs as ITabBarButtonProps[]).map((x: ITabBarButtonProps) => {
      const { sport, ...restQuery } = x?.query

      return {
        ...x,
        pathname: isViVoRoute
          ? `/[sport]/vivo`
          : '/[sport]/[category]/[league_id]',
        active: sport === query?.sport,
        query: isViVoRoute
          ? {
              sport,
            }
          : {
              sport,
              ...restQuery,
            },
      }
    })
  }, [isViVoRoute, query?.sport])

  return {
    items,
    query,
  }
}

export default useSportTabBar
