import { SwiperSlide, Swiper } from 'swiper/react'

const MatchTabBarSkeleton = () => {
  return (
    <Swiper
      className="grid grid-cols-2 gap-4 lg:grid-cols-5 animate-pulse"
      slidesPerView="auto"
    >
      {[...Array(6)].map((_, index) => (
        <SwiperSlide
          key={index}
          className="border-r border-r-slate-300 last-of-type:border-r-0"
        >
          <div className="px-4 py-2 h-[164px]">
            <div className="h-full bg-slate-300 rounded-md"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MatchTabBarSkeleton
