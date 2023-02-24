import { useRouter } from 'next/router'
import React from 'react'
import Card from 'src/components/Card/Card'
import useBlog from 'src/hooks/useBlog/useBlog'
import styles from './HotNews.module.css'
import cx from 'classnames'
import Link from '@app/link'
import Image from '@app/image'
import { shimmer } from 'src/utils/shimmer'
import { useI18n } from '@corex/use-i18n'

export interface IHotNewsProps {
  small?: boolean
}

const HotNews: React.FC<IHotNewsProps> = ({ small }) => {
  const { query } = useRouter()

  const { t } = useI18n()

  const endpoint = React.useMemo(
    () => (query?.sport ? `/api/blogs/${query?.sport}/latest` : null),
    [query?.sport]
  )

  const { data } = useBlog(endpoint)

  const loading = React.useMemo(() => !data, [data])

  if (data?.length === 0) {
    return <></>
  }

  return (
    <Card title={t('hot_news')}>
      <div
        className={cx(styles.base, {
          [styles['base-loading']]: loading,
          [styles.small]: small,
        })}
      >
        {loading &&
          [...Array(5)].map((_, index) => (
            <div key={index} className={styles.item}>
              <div className={cx(styles.image, styles['image-loading'])} />
            </div>
          ))}

        {!loading &&
          data?.map((post, index) => (
            <Link key={post.id} href={{ pathname: `/artigos/${post?.slug}` }}>
              <a className={styles.item}>
                <div className={cx(styles.image)}>
                  {post.feature_image && (
                    <Image
                      src={post.feature_image}
                      alt={post.title}
                      width={index === 0 ? 256 : 80}
                      height={index === 0 ? 256 : 80}
                      className="!w-full !h-full !object-cover"
                    />
                  )}
                </div>
                <div className={styles['item-header']}>
                  <div className={styles.title}>{post?.title}</div>
                  <small className={styles.date}>{post?.formatted_time}</small>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Card>
  )
}

export default HotNews
