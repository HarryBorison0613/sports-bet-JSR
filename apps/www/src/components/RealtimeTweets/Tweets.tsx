import Card from 'src/components/Card/Card'
import styles from './RealtimeTweets.module.css'
import Image from '@app/image'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { ITweet } from 'src/interface'

export const Tweets: React.FC<{ tweets: ITweet[] }> = ({ tweets }) => {
  const { completed, paginatedData, nextPage } = usePaginatedData(tweets, 2)

  return (
    <Card title="Tempo Real" viewMore={!completed} onClickViewMore={nextPage}>
      <>
        {paginatedData?.map((tweet) => (
          <div key={tweet?.id} className={styles.base}>
            <div>
              <Image
                src={tweet?.author?.profile_image_url}
                alt={tweet?.author?.name}
                width={40}
                height={40}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.name}>{tweet?.author?.name}</div>
              <div className={styles.text}>{tweet?.text}</div>
              <div className={styles.summary}>{tweet?.timeSince}</div>
            </div>
          </div>
        ))}
      </>
    </Card>
  )
}
