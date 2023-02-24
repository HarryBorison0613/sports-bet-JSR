import Card, { ICardProps } from '../Card/Card'

export type IAboutProps = ICardProps

const About: React.FC<IAboutProps> = (props) => {
  return (
    <Card title="Sobre" {...props}>
      <Card.Content>
        <p>
          BETS.com.br é um site feito no Brasil para brasileiros. Temos mais de
          450.000 páginas de conteúdo esportivo, estatísticas, ligas, jogos e
          conteúdo de apostas. Cadastre-se para receber atualizações diárias do
          BETS!
        </p>
      </Card.Content>
    </Card>
  )
}

export default About
