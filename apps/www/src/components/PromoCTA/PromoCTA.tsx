import Image from '@app/image'
import Card, { ICardProps } from 'src/components/Card/Card'

const PromoCTA: React.FC<ICardProps> = (props) => {
  return (
    <Card
      className="!bg-transparent !shadow-none !border-0 !mx-auto flex justify-center"
      {...props}
    >
      <a
        className="relative !inline-block h-max overflow-hidden mx-auto"
        href="https://cadastro.bets.com.br/novo?utm_source=mainpage_side_offer"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="!rounded-md object-cover"
          src="/home/footer_img.png"
          alt="Promo"
          width={300}
          height={720}
        />
      </a>
    </Card>
  )
}

export default PromoCTA
