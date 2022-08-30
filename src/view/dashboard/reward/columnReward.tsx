import { MintAvatar, MintSymbol } from '@sen-use/app'

import { Space } from 'antd'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'

type ColumnRewardProps = {
  rewardAddress: string
}

const ColumnReward = ({ rewardAddress }: ColumnRewardProps) => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const mint = rewards[rewardAddress].mint

  return (
    <Space>
      <MintAvatar mintAddress={mint.toBase58()} />
      <MintSymbol mintAddress={mint.toBase58()} />
    </Space>
  )
}

export default ColumnReward
