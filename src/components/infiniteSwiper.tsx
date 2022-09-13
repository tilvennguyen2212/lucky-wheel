import { ReactNode } from 'react'

import { Autoplay, Lazy } from 'swiper'
import { Swiper } from 'swiper/react'

type InfiniteSwiperProps = {
  perViews?: number
  spacing?: number
  speed?: number
  children?: ReactNode
}
const InfiniteSwiper = ({
  perViews = 4,
  spacing = 0,
  speed = 9000,
  children,
}: InfiniteSwiperProps) => {
  const configAutoplay = {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: false,
  }

  return (
    <Swiper
      modules={[Autoplay, Lazy]}
      slidesPerView={perViews}
      spaceBetween={spacing}
      autoplay={configAutoplay}
      speed={speed}
      loop
      className="apps-slide-infinite"
    >
      {children}
    </Swiper>
  )
}

export default InfiniteSwiper
