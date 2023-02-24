import useClassificationContext from 'src/hooks/useClassificationContext/useClassificationContext'
import Classification from 'src/components/Classification/Classification'
import cx from 'classnames'
import Card from 'src/components/Card/Card'
import Alert from 'src/components/Alert/Alert'
import Link from '@app/link'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import useSeasonContext from 'src/hooks/useSeasonContext/useSeasonContext'
import React from 'react'

const SeasonClassification: React.FC = () => {
  const { activeSeasonStandingGroup, activeSeasonStanding } =
    useClassificationContext()

  const { season } = useSeasonContext()

  const { createTeamHref, query } = useCreateHref()

  const goalsTitle = React.useMemo(() => {
    switch (query?.sport) {
      case 'beisebol':
        return 'Corre'

      default:
        return 'Gols'
    }
  }, [query?.sport])

  return (
    <>
      <Card.Content>
        <div className="grid grid-cols-12 gap-4 !text-[0.7rem] py-[0.5rem] font-semibold border-b">
          <div className="col-span-4 flex items-center">
            <div>Nu</div>
            <div className="flex-1 text-center">Equipe</div>
          </div>

          <div className="col-span-6 lg:col-span-4 grid grid-cols-5 items-center gap-2">
            <div>P</div>
            <div>W</div>
            <div>D</div>
            <div>L</div>
            <div
              className={cx('text-center', {
                hidden: query?.sport === 'basquete',
              })}
            >
              {goalsTitle}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-4 flex items-center justify-end gap-6">
            <div className="flex-1 text-center pl-6 hidden lg:block">
              Últimos 5 jogos
            </div>
            <div>Pts</div>
          </div>
        </div>

        <div className="text-xs">
          {activeSeasonStandingGroup?.standings?.map((standing, index) => (
            <Link
              key={standing?.competitor?.team_id}
              href={createTeamHref(standing?.competitor, season!)}
            >
              <a
                className={cx(
                  'grid gap-4 grid-cols-12 items-center',
                  'py-[0.5rem]',
                  'border-b last-of-type:border-b-0',
                  'hover:bg-slate-100 hover:text-primary-500 cursor-pointer'
                )}
              >
                <div className="col-span-4 flex items-center gap-2">
                  <span>{index + 1}. </span>
                  <Classification.Team
                    name={standing?.competitor?.name}
                    icon={standing?.competitor?.icon}
                    size="medium"
                  />
                </div>

                <div
                  className={cx(
                    'col-span-6 lg:col-span-4 px-2 lg:px-0',
                    'grid grid-cols-5 items-center gap-2'
                  )}
                >
                  <div>{standing?.played}</div>
                  <div>{standing?.win}</div>
                  <div>{standing?.draw}</div>
                  <div>{standing?.loss}</div>
                  <div
                    className={cx({
                      hidden: query?.sport === 'basquete',
                    })}
                  >
                    {standing?.goals_for ??
                      standing?.points_for ??
                      standing?.runs_for}
                    :
                    {standing?.goals_against ??
                      standing?.points_against ??
                      standing?.runs_against}
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-4 flex items-center justify-end gap-6">
                  <Classification.Streak
                    streak={
                      standing?.streak_formatted ?? standing?.competitor?.form
                    }
                    className="hidden lg:flex"
                  />

                  <div className="text-right">
                    {standing?.points ?? standing?.points_for ?? '-'}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Card.Content>

      {activeSeasonStanding?.tie_break_rule && (
        <Card.Content>
          <Alert type="info">
            <Alert.Content>
              {activeSeasonStanding?.tie_break_rule}
            </Alert.Content>
          </Alert>
        </Card.Content>
      )}
    </>
  )
}

export default SeasonClassification
