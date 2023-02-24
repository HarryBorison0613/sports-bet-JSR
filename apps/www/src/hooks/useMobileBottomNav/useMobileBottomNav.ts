import { useI18n } from '@corex/use-i18n'
import { useRouter } from 'next/router'
import React from 'react'
import type { IMobileBottomNavItem } from 'src/components/MobileBottomNav/MobileBottomNav'
import { AccountIcon } from 'src/icons/account'
import { ArticleIcon } from 'src/icons/article'
import { LiveIcon } from 'src/icons/live'
import { SportIcon } from 'src/icons/sport'

export const useMobileBottomNav = () => {
  const { query, pathname } = useRouter()

  const { t } = useI18n()

  const items = React.useMemo<IMobileBottomNavItem[]>(
    () => [
      {
        label: 'Esportes',
        Icon: SportIcon,
        href: {
          pathname: '/[sport]/[category]/[league_id]',
          query: {
            sport: 'futebol',
            category: 'brasil',
            league_id: '325',
          },
        },
        active: Boolean(query?.sport) && !pathname.endsWith('vivo'),
      },
      {
        label: t('live'),
        Icon: LiveIcon,
        href: {
          pathname: '/[sport]/vivo',
          query: {
            sport: query?.sport ?? 'futebol',
          },
        },
        active: Boolean(query?.sport) && pathname.endsWith('vivo'),
      },
      {
        label: 'Notícias',
        Icon: ArticleIcon,
        href: {
          pathname: '/artigos',
        },
      },
      //       {
      //         label: 'Conta',
      //         Icon: AccountIcon,
      //         href: {
      //           pathname: '/conta',
      //         },
      //         active: pathname === '/conta',
      //       },
      {
        label: 'Conta',
        Icon: AccountIcon,
        href: {
          pathname: 'https://pro.bets.com.br/',
        },
        active: pathname === 'https://pro.bets.com.br/',
      },
    ],
    [pathname, query?.sport, t]
  )

  return {
    items,
  }
}
