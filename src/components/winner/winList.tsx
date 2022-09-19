import { CSSProperties } from 'react'
import { util } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { SwiperSlide } from 'swiper/react'
import { Space, Typography } from 'antd'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'
import InfiniteSwiper from 'components/infiniteSwiper'
import MilestoneTag from './milestoneTag'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { Winner } from './index'

type CardWinInfoProps = {
  authority: string
  rewardAddress?: string
  milestone?: BN
}
const CardWinInfo = ({
  authority,
  rewardAddress,
  milestone,
}: CardWinInfoProps) => {
  if (!rewardAddress || !!milestone)
    return (
      <Space size={6}>
        <Typography.Text>{util.shortenAddress(authority)}</Typography.Text>
        <Typography.Text type="secondary">reached</Typography.Text>
        <MilestoneTag value={milestone} />
        <Typography.Text type="secondary">milestone!</Typography.Text>
      </Space>
    )

  return (
    <Space size={6}>
      <Typography.Text>{util.shortenAddress(authority)}</Typography.Text>
      <Typography.Text type="secondary">won</Typography.Text>
      <Typography.Text style={{ color: '#B67AFF' }}>
        <RewardAmount rewardAddress={rewardAddress} />{' '}
        <RewardName rewardAddress={rewardAddress} />
      </Typography.Text>
    </Space>
  )
}

type WinListProps = {
  data: Winner[]
  height?: CSSProperties['height']
}

const WinList = ({ data = [], height = 240 }: WinListProps) => {
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)

  return (
    <InfiniteSwiper spacing={24} speed={12000}>
      {!!Object.keys(rewards).length &&
        data.map(({ authority, rewardAddress, milestone }, idx) => (
          <SwiperSlide key={idx} style={{ height }}>
            <CardWinInfo
              authority={authority}
              rewardAddress={rewardAddress}
              milestone={milestone}
            />
          </SwiperSlide>
        ))}
    </InfiniteSwiper>
  )
}

export default WinList
