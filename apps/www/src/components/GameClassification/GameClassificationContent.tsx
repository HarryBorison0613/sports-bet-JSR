import useClassificationContext from 'src/hooks/useClassificationContext/useClassificationContext'
import Card, { ICardProps } from 'src/components/Card/Card'
import Classification from 'src/components/Classification/Classification'
import cx from 'classnames'
import useGameContext from 'src/hooks/useGameContext/useGameContext'
import Link from '@app/link'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'

export const GameClassificationContent: React.FC<ICardProps> = (props) => {
  const { homeTeam, awayTeam, season } = useGameContext()

  const { activeSeasonStandingGroup } = useClassificationContext()

  const { createTeamHref } = useCreateHref()

  return (
    <Card title="Classificação" {...props}>
      <div className="grid grid-cols-12 gap-1 !text-[0.65rem] p-3 py-[0.5rem] font-semibold border-b">
        <div className="col-span-1 text-left">Nu</div>
        <div className="col-span-6 text-center">Equipe</div>
        <div className="col-span-5 text-center">Últimos 5 jogos</div>
      </div>

      {activeSeasonStandingGroup?.standings?.map((standing, index) => {
        return (
          <Link key={index} href={createTeamHref(standing?.competitor, season)}>
            <a
              className={cx(
                'grid grid-cols-12 gap-2 items-center text-xs p-3 py-[0.7rem] border-b last-of-type:border-b-0',
                'hover:bg-blue-50 hover:text-primary-500 cursor-pointer',
                {
                  'bg-green-200 font-bold':
                    homeTeam?.team_id === standing?.competitor?.team_id,
                  'bg-blue-200 font-bold':
                    awayTeam?.team_id === standing?.competitor?.team_id,
                }
              )}
            >
              <div className="col-span-1">{standing?.rank}</div>

              <Classification.Team
                className={cx('col-span-6')}
                name={standing?.competitor?.name}
                icon={standing?.competitor?.icon}
                size="small"
              />

              {standing?.competitor?.form && (
                <Classification.Streak
                  className="col-span-5 !justify-end"
                  size="small"
                  streak={
                    standing?.streak_formatted ?? standing?.competitor?.form
                  }
                />
              )}
            </a>
          </Link>
        )
      })}
    </Card>
  )
}
