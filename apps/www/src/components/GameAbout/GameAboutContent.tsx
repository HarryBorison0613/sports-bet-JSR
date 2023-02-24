import Card from 'src/components/Card/Card'
import useTextSummary from 'src/hooks/useTextSummary/useTextSummary'

export interface IGameAboutContentProps {
  content: string[]
}

const GameAboutContent: React.FC<IGameAboutContentProps> = ({ content }) => {
  const { summarizedText, label, onToggleTextSummary } = useTextSummary(content)

  return (
    <Card title="Sobre o jogo">
      {summarizedText?.map((text, index) => (
        <Card.Content key={index} className="!text-sm !pb-0">
          <Card.Description>{text}</Card.Description>
        </Card.Content>
      ))}

      <Card.Content>
        <a
          className="text-primary-500 text-sm cursor-pointer font-semibold"
          onClick={onToggleTextSummary}
        >
          {label}
        </a>
      </Card.Content>
    </Card>
  )
}

export default GameAboutContent
