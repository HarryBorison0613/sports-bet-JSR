import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper'
import useLatestPosts from 'src/hooks/useBlog/useBlog'
import { useRouter } from 'next/router'
import Link from '@app/link'
import cx from 'classnames'
import styles from './FeaturedBlogCarousel.module.css'
import React from 'react'
import Image from '@app/image'

const FeaturedBlogCarousel = () => {
  const { query } = useRouter()

  const endpoint = React.useMemo(
    () => (query?.sport ? `/api/blogs/${query.sport}/featured` : null),
    [query.sport]
  )

  const { data } = useLatestPosts(endpoint)

  const loading = React.useMemo(() => !data, [data])

  if (data?.length === 0 || !data) {
    return <></>
  }

  

  return (
    <Swiper
      className={cx(styles.base, {
        [styles['base-loading']]: loading,
      })}
      slidesPerView="auto"
      spaceBetween={12}
      pagination={{
        clickable: !loading,
        dynamicBullets: true,
      }}
      navigation={!loading}
      modules={[Navigation, Autoplay, Pagination]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
    >
      {loading && (
        <>
          {[...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>
              <div
                className={cx(styles.content, {
                  [styles['content-loading']]: loading,
                })}
              />
            </SwiperSlide>
          ))}
        </>
      )}

      {!loading &&
        data?.map((post) => (
          <SwiperSlide key={post?.id}>
            <Link href={{ pathname: `/artigos/${post?.slug}` }}>
              <a className={cx(styles.content)}>
                {post?.feature_image ? (
                  <Image
                    src={post?.feature_image}
                    width={256}
                    height={256}
                    alt={post?.title}
                    className="!object-cover !w-full !h-full absolute inset-0"
                    loading="eager"
                  />
                ) : null}
                <div className={styles.overlay} />
                <div className="p-4 py-6 relative transition-all">
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      {post?.title}
                    </h3>
                    <div className="text-white/90 text-sm">
                      {post?.formatted_time}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default FeaturedBlogCarousel
