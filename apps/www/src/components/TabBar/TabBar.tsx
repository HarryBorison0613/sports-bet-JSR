import Container from 'src/components/Container/Container'
import styles from './TabBar.module.css'
import type { ITabBarButtonProps } from 'src/components/TabBarButton/TabBarButton'
import TabBarButton from 'src/components/TabBarButton/TabBarButton'
import { Swiper, SwiperSlide } from 'swiper/react'

export interface ITabBarProps {
  items: ITabBarButtonProps[]
}

const TabBar: React.FC<ITabBarProps> = ({ items }) => {
  return (
    <div className={styles.base}>
      <Container className={styles.container}>
        <Swiper
          slidesPerView="auto"
          className="hidden lg:grid lg:grid-cols-5 lg:gap-8"
        >
          {items?.map((item, index) => (
            <SwiperSlide key={index}>
              <TabBarButton {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <div className="flex justify-between lg:hidden">
        {items?.map((item, index) => (
          <TabBarButton key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default TabBar
