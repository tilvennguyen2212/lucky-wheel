import { useMemo } from 'react'
import { useWidth } from '@sentre/senhub'

import { Space, Typography } from 'antd'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'

import { Material } from './index'
import GradientAvatar from 'components/gradientAvatar/gradientAvatar'

type DisplayRewardProps = {
  material: Material
  isBest?: boolean
}
const DisplayReward = ({ material, isBest = false }: DisplayRewardProps) => {
  const { rewardAddress } = material
  const width = useWidth()

  const avatarSize = useMemo(() => {
    if (width < 590) return 24
    if (width < 427) return 12
    return 48
  }, [width])

  return (
    <Space
      style={{ zIndex: 3, position: 'relative' }}
      direction="vertical"
      size={0}
    >
      {isBest ? (
        <GradientAvatar size={avatarSize}>
          <RewardAvatar rewardAddress={rewardAddress} size={avatarSize} />
        </GradientAvatar>
      ) : (
        <RewardAvatar rewardAddress={rewardAddress} size={avatarSize} />
      )}
      <Typography.Title
        level={5}
        style={{ color: '#212433', fontFamily: 'Nunito', fontWeight: 'bold' }}
      >
        <RewardAmount rewardAddress={rewardAddress} />
      </Typography.Title>
      <Typography.Text
        style={{ color: '#212433', fontFamily: 'Nunito', fontSize: 10 }}
      >
        <RewardName rewardAddress={rewardAddress} />
      </Typography.Text>
    </Space>
  )
}

export default DisplayReward
