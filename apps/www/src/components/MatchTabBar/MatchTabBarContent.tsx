import type { IGameSummary } from 'src/interface'
import Link from '@app/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import cx from 'classnames'
import MatchTabBarItem from './MatchTabBarItem'
import useCreateHref from 'src/hooks/useCreateHref/useCreateHref'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import React from 'react'

export interface IMatchTabBarContentProps {
  games: IGameSummary[]
}

const MatchTabBarContent: React.FC<IMatchTabBarContentProps> = ({ games }) => {
  const { createGameHref, query } = useCreateHref()

  const { paginatedData, nextPage } = usePaginatedData(games)

  return (
    <Swiper
      className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4"
      slidesPerView="auto"
      modules={[Navigation]}
      navigation={true}
      freeMode={true}
      onReachEnd={nextPage}
    >
      {paginatedData?.map((summary) => (
        <SwiperSlide
          key={summary?.sport_event?.sport_event_id}
          className={cx('border-r border-slate-300 h-full', {
            'border-b-4 border-b-primary-500 bg-slate-300':
              summary?.sport_event?.sport_event_id === query?.game_id,
          })}
        >
          <Link href={createGameHref(summary?.sport_event)}>
            <MatchTabBarItem summary={summary} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MatchTabBarContent
