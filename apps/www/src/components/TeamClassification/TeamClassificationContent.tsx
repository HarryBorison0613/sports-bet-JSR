import Card from 'src/components/Card/Card'
import Image from '@app/image'
import cx from 'classnames'
import Link from '@app/link'
import { ISeasonStandingGroupStanding } from 'src/interface'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import React from 'react'

export interface ITeamClassificationContentProps {
  standings: ISeasonStandingGroupStanding[]
}

export const TeamClassificationContent: React.FC<
  ITeamClassificationContentProps
> = ({ standings }) => {
  const { createTeamHref, query } = useCreateHref()

  const { paginatedData, nextPage, completed } = usePaginatedData(standings)

  return (
    <Card
      title="Classificação"
      viewMore={!completed}
      onClickViewMore={nextPage}
    >
      <div className="grid grid-cols-12 gap-1 !text-[0.7rem] p-1 px-4 font-semibold border-b">
        <div className="col-span-1">Nu</div>
        <div className="col-span-7 text-center">Equipe</div>
        <div className="col-span-2 text-right">GP</div>
        <div className="col-span-2 text-right">P</div>
      </div>

      {paginatedData?.map((standing) => {
        const href = createTeamHref(standing?.competitor, {
          ...query,
          slug: query?.season_slug,
        } as any)

        return (
          <Link key={standing?.competitor?.team_id} href={href}>
            <a
              className={cx(
                'grid grid-cols-12 items-center gap-1 p-[0.75rem] px-4 border-b last-of-type:border-b-0 !text-sm',
                'hover:bg-blue-100 hover:text-primary-500 cursor-pointer',
                {
                  'bg-green-300 hover:!bg-green-400 hover:text-white':
                    query?.team_id === standing?.competitor?.team_id,
                }
              )}
            >
              <div className="col-span-1">{standing?.rank}</div>

              <div className="col-span-7 flex items-center gap-2 pr-1">
                {standing?.competitor?.icon && (
                  <Image
                    src={standing?.competitor?.icon}
                    alt={standing?.competitor?.name}
                    width={24}
                    height={24}
                  />
                )}
                <div className="truncate">{standing?.competitor?.name}</div>
              </div>

              <div className="col-span-2 text-right">{standing?.played}</div>

              <div className="text-right col-span-2">
                {standing?.points ?? standing?.points_for}
              </div>
            </a>
          </Link>
        )
      })}
    </Card>
  )
}
