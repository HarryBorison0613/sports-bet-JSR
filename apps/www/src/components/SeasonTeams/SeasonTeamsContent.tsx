import Link from '@app/link'
import CardGrid from '../CardGrid/CardGrid'
import { ITeam } from 'src/interface'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'

const SeasonTeamsContent: React.FC<{ teams: ITeam[] }> = ({ teams }) => {
  const { season } = useSeasonContext()

  const { createTeamHref } = useCreateHref()

  const { paginatedData, completed, nextPage } = usePaginatedData(teams, 12)

  return (
    <CardGrid
      title="Equipes"
      className="grid-cols-3"
      viewMore={!completed}
      onClickViewMore={nextPage}
    >
      {paginatedData?.map((team) => (
        <Link key={team?.id} href={createTeamHref(team, season!)}>
          <CardGrid.Item icon={team?.icon} />
        </Link>
      ))}
    </CardGrid>
  )
}

export default SeasonTeamsContent
