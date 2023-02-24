import CategoryDetailsList from '../CategoryDetailsList/CategoryDetailsList'
import Collapse from 'src/components/Collapse/Collapse'
import LatestSeasonTeamContent from './LatestSeasonTeamContent/LatestSeasonTeamContent'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { ISeason, ITeam } from 'src/interface'
import cx from 'classnames'
import Link from '@app/link'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import React from 'react'

export interface ILatestSeasonDetailsProps {
  teams: ITeam[]
  season: ISeason
}

const LatestSeasonDetails: React.FC<ILatestSeasonDetailsProps> = ({
  teams,
  season,
}) => {
  const [activeCollapseId, setActiveCollapseId] = React.useState<string | null>(
    null
  )

  const { paginatedData, nextPage, completed } = usePaginatedData(teams)

  const { query, createTeamHref } = useCreateHref()

  const handleCollapseToggle = React.useCallback(
    (id: string) => setActiveCollapseId((x) => (x === id ? null : id)),
    []
  )

  return (
    <CategoryDetailsList title="Times">
      {paginatedData?.map((team) => {
        const open = activeCollapseId === team?.team_id

        return (
          <Collapse
            key={team?.team_id}
            title={team?.name}
            icon={team?.icon}
            open={open}
            onToggleCollapse={() => handleCollapseToggle(team?.team_id)}
            action={
              open ? (
                <Link href={createTeamHref(team, season)!}>
                  <a className="text-sm hover:text-primary-500">Veja mais</a>
                </Link>
              ) : undefined
            }
          >
            <LatestSeasonTeamContent
              team={team}
              sport={query?.sport as string}
            />
          </Collapse>
        )
      })}

      {!completed && (
        <div
          className={cx(
            'text-primary text-center p-3 text-sm font-medium bg-blue-50 rounded-md rounded-t-none',
            'cursor-pointer hover:bg-blue-200'
          )}
          onClick={nextPage}
        >
          mais equipes
        </div>
      )}
    </CategoryDetailsList>
  )
}

export default LatestSeasonDetails
