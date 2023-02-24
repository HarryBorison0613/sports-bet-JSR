import { useI18n } from '@corex/use-i18n'
import React from 'react'
import Card from 'src/components/Card/Card'
import type { ILeague, ITeamLeagueStat } from 'src/interface'
import TeamLeagueStatContentSwitcher, {
  ITeamLeagueStatContentSwitcherOption,
} from './TeamLeagueStatContentSwitcher'

export interface ITeamLeagueStatContentProps {
  stat: ITeamLeagueStat
  competitions: ILeague[]
}

const TeamLeagueStatContent: React.FC<ITeamLeagueStatContentProps> = ({
  stat,
  competitions,
}) => {
  const { t } = useI18n()

  const options = React.useMemo<ITeamLeagueStatContentSwitcherOption[]>(
    () =>
      competitions
        ?.map((x) => ({
          id: x?.league_id,
          label: x?.name,
          icon: x?.icon,
        }))
        ?.filter((x) => Object.keys(stat[x?.id] ?? {}).length > 0),
    [competitions, stat]
  )

  const [selected, setSelected] = React.useState(options[0])

  const onChange = React.useCallback(
    (option: ITeamLeagueStatContentSwitcherOption) => {
      setSelected(option)
    },
    []
  )

  const compStats = React.useMemo(
    () => stat[selected?.id] ?? {},
    [selected?.id, stat]
  )

  return (
    <Card title="Estatísticas da Temporada">
      <Card.Content>
        <TeamLeagueStatContentSwitcher
          options={options}
          selected={selected}
          onChange={onChange}
        />
      </Card.Content>

      {Object.keys(compStats)?.map((key) => {
        const item = compStats[key]

        const itemKeys = Object.keys(item)

        if (!itemKeys || itemKeys?.length === 0) {
          return <React.Fragment key={key} />
        }

        return (
          <Card.Content key={key} title={t(key) ?? key}>
            {itemKeys?.map((sectionKey) => (
              <Card.LineItem
                key={sectionKey}
                label={t(sectionKey) ?? sectionKey}
              >
                {item[sectionKey]}
              </Card.LineItem>
            ))}
          </Card.Content>
        )
      })}
    </Card>
  )
}

export default TeamLeagueStatContent
