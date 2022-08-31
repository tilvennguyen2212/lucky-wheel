import { CSSProperties } from 'react'
import { Autoplay, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { util } from '@sentre/senhub'
import { MintAmount, MintSymbol } from '@sen-use/app'

import { Space, Typography } from 'antd'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'
import { Winner } from './winners'

type InfiniteSwiperProps = {
  perViews?: number
  spacing?: number
  speed?: number
  data?: Winner[]
  height?: CSSProperties['height']
}
const InfiniteSwiper = ({
  perViews = 4,
  spacing = 0,
  speed = 9000,
  data = [],
  height = 240,
}: InfiniteSwiperProps) => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)

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
      {data.map(({ authority, rewardAddress }, idx) => (
        <SwiperSlide key={idx} style={{ height }}>
          <Space>
            <Typography.Text>{util.shortenAddress(authority)} </Typography.Text>
            <Typography.Text style={{ color: '#B67AFF' }}>
              <MintAmount
                mintAddress={rewards[rewardAddress].mint.toBase58()}
                amount={rewards[rewardAddress].prizeAmount}
              />
              <MintSymbol
                mintAddress={rewards[rewardAddress].mint.toBase58()}
              />
            </Typography.Text>
          </Space>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default InfiniteSwiper
