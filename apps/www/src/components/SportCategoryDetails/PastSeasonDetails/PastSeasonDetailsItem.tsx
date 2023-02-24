import Link from '@app/link'
import React from 'react'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import type { ISeason } from 'src/interface'

export const PastSeasonDetailsItem: React.FC<{ season: ISeason }> = ({
  season,
}) => {
  const { createSeasonHref, query } = useCreateHref()

  const seasonHref = React.useMemo(
    () =>
      season?.country_info
        ? createSeasonHref({
            ...season,
            country_info: {
              ...season?.country_info,
              slug: query?.category as string,
            },
          })
        : undefined,
    [createSeasonHref, query?.category, season]
  )

  if (!seasonHref) {
    return <React.Fragment key={season?.id} />
  }

  return (
    <Link key={season?.season_id} href={seasonHref}>
      <a className="block hover:bg-slate-50 hover:text-primary-500 p-2 border-b last-of-type:border-b-0">
        {season?.name}
      </a>
    </Link>
  )
}
