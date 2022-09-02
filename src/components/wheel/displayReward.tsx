import { Space, Typography } from 'antd'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'

import { Material } from './index'

type DisplayRewardProps = {
  material: Material
}
const DisplayReward = ({ material }: DisplayRewardProps) => {
  const { rewardAddress } = material

  return (
    <Space
      style={{ zIndex: 3, position: 'relative' }}
      direction="vertical"
      size={0}
    >
      <RewardAvatar rewardAddress={rewardAddress} size={64} />
      <Typography.Title
        level={4}
        style={{ color: '#212433', fontFamily: 'Nunito', fontWeight: 'bold' }}
      >
        <RewardAmount rewardAddress={rewardAddress} />
      </Typography.Title>
      <Typography.Title
        level={4}
        style={{ color: '#212433', fontFamily: 'Nunito' }}
      >
        <RewardName rewardAddress={rewardAddress} />
      </Typography.Title>
    </Space>
  )
}

export default DisplayReward
