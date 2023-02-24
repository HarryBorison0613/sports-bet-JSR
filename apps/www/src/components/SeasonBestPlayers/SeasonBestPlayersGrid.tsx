import CardGrid from 'src/components/CardGrid/CardGrid'
import type { IPlayer } from 'src/interface'

export const SeasonBestPlayersGrid: React.FC<{ players: IPlayer[] }> = ({
  players,
}) => {
  return (
    <CardGrid title="Melhores jogadores" className="grid-cols-2">
      {players?.map((player) => (
        <CardGrid.Item
          key={player?.id}
          icon={player?.team?.icon}
          label={player?.name}
        />
      ))}
    </CardGrid>
  )
}
