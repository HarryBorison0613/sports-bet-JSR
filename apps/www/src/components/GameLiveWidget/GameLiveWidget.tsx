import Card from 'src/components/Card/Card'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import React from 'react'
import useSize from 'src/hooks/useSize/useSize'

const GameLiveWidget: React.FC = () => {
  const target = React.useRef(null)

  const size = useSize(target)

  const { query } = useGlobalContext()
  
  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)?.SIR) {
      ;(window as any)?.SIR('addWidget', '#live-game-widget', 'match.lmtPlus', {
        layout: 'topdown',
        matchId: query?.game_id,
        showOdds: true,
        scoreboard: 'extended',
        //    momentum: 'extended',
        pitchLogo: 'https://bets-com.vercel.app/logo.png',
        goalBannerImage: 'https://bets-com.vercel.app/logo.png',
        logo: ['https://bets-com.vercel.app/logo.png'],
      })
    }
  }, [query?.game_id])

  return (
    <Card className="min-w-0 box-border">
      <div ref={target}>
        <div
          id="live-game-widget"
          style={{ width: `${(size as any)?.width}px` }}
        />
      </div>
    </Card>
  )
}

export default GameLiveWidget
