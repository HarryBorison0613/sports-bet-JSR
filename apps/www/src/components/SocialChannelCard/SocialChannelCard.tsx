import Card from 'src/components/Card/Card'
import { socials } from 'src/data/social'
import styles from './SocialChannelCard.module.css'
import { FiExternalLink } from 'react-icons/fi'

const SocialChannelCard: React.FC = () => {
  return (
    <Card title="Siga a Bets">
      {socials?.map((social) => (
        <a
          href={social.link}
          className={styles.base}
          key={social.label}
          target="_blank"
          rel="noreferrer"
        >
          <social.icon className={styles.icon} />
          <span className={styles.label}>{social.label}</span>
          <FiExternalLink />
        </a>
      ))}
    </Card>
  )
}

export default SocialChannelCard
