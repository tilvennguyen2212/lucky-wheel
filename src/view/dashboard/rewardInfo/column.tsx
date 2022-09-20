import { Space, Typography } from 'antd'
import RewardRatio from 'components/reward/rewardRatio'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'

export const COLUMNS_REWARD_INFO = [
  {
    title: 'NO.',
    dataIndex: 'index',
    key: 'index',
    render: (index: number) => <Typography.Text> {index + 1} </Typography.Text>,
  },
  {
    title: 'REWARD',
    dataIndex: 'address',
    key: 'address',
    render: (rewardAddress: string) => {
      return (
        <Space>
          <RewardAvatar rewardAddress={rewardAddress} size={32} />
          <RewardAmount rewardAddress={rewardAddress} />
          <RewardName rewardAddress={rewardAddress} />
        </Space>
      )
    },
  },

  {
    title: 'WINNING PROBABILITY',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => (
      <Typography.Text>
        <RewardRatio rewardAddress={address} />
      </Typography.Text>
    ),
  },
]
