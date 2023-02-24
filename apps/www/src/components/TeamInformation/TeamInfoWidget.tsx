import React from 'react'
import useSize from 'src/hooks/useSize/useSize'

export interface ITeamInfoWidgetProps {
  teamUid: string
  seasonId: string
}

const TeamInfoWidget: React.FC<ITeamInfoWidgetProps> = ({
  seasonId,
  teamUid,
}) => {
  const target = React.useRef(null)

  const size = useSize(target)

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)?.SIR) {
      ;(window as any)?.SIR('addWidget', '#team-info-widget', 'team.info', {
        teamUid,
        seasonId,
      })
    }
  }, [seasonId, teamUid])

  return <div id="team-info-widget" ref={target} />
}

export default TeamInfoWidget
