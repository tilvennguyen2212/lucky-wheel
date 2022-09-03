import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

import RewardTable from './rewardTable'
import { Row, Typography } from 'antd'
import RewardRatio from 'components/reward/rewardRatio'
import { RewardAmount } from 'components/reward/rewardAmount'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

const columns = [
  {
    title: 'Prize Amount',
    dataIndex: 'address',
    key: 'address',
    render: (rewardAddress: string) => {
      return <RewardAmount rewardAddress={rewardAddress} />
    },
  },
  {
    title: 'Reserve Prize',
    dataIndex: 'reservePrize',
    key: 'reservePrize',
    render: (reservePrize: BN) => (
      <Typography>{reservePrize.toNumber()}</Typography>
    ),
  },

  {
    title: 'Ratio',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => (
      <Typography.Text>
        <RewardRatio rewardAddress={address} />
      </Typography.Text>
    ),
  },
  {
    title: 'Action',
    render: () => <ColumnAction />,
  },
]

const ColumnAction = () => {
  return <Row></Row>
}

const TicketRewardTable = () => {
  const campaign = useSelector((state: AppState) => state.main.campaign)
  const rewards = useRewardByCampaign(campaign)

  const data = useMemo(() => {
    return Object.keys(rewards)
      .filter((address) => !!rewards[address].rewardType.ticket)
      .map((address) => {
        return { address, ...rewards[address] }
      })
  }, [rewards])

  return <RewardTable title={'Ticket Rewards'} columns={columns} data={data} />
}

export default TicketRewardTable
