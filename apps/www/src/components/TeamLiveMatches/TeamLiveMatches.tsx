import React from 'react'
import { ICardProps } from 'src/components/Card/Card'
import MatchTable from 'src/components/MatchTable/MatchTable'
import { useI18n } from '@corex/use-i18n'
import { useLiveMatches } from 'src/hooks/useLiveMatches/useLiveMatches'

const TeamLiveMatches: React.FC<ICardProps> = (props) => {
  const { t } = useI18n()

  const { getLiveGamesByTeamId, query, loading } = useLiveMatches()

  return (
    <MatchTable
      title={t('live_matches')}
      summaries={getLiveGamesByTeamId(query?.team_id as string) as any}
      variant="danger"
      loading={loading}
      {...props}
    />
  )
}

export default TeamLiveMatches
