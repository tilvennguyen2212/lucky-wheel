import { CSSProperties } from 'react'
import { util } from '@sentre/senhub'

import { Autoplay, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Space, Typography } from 'antd'
import { Winner } from './winners'
import { RewardAmount } from './reward/rewardAmount'
import { RewardName } from './reward/rewardName'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

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
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)

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
      {Object.keys(rewards).length &&
        data.map(({ authority, rewardAddress }, idx) => (
          <SwiperSlide key={idx} style={{ height }}>
            <Space>
              <Typography.Text>
                {util.shortenAddress(authority)} won
              </Typography.Text>
              <Typography.Text style={{ color: '#B67AFF' }}>
                <RewardAmount rewardAddress={rewardAddress} />{' '}
                <RewardName rewardAddress={rewardAddress} />
              </Typography.Text>
            </Space>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default InfiniteSwiper
