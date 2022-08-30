import { web3 } from '@project-serum/anchor'
import { Table } from 'antd'

import { SENTRE_CAMPAIGN } from 'constant'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'
import ColumnReward from './columnReward'

const Reward = () => {
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)

  const columns = [
    {
      title: 'REWARD',
      dataIndex: 'reward',
      key: 'reward',
      render: (reward: web3.PublicKey) => (
        <ColumnReward rewardAddress={reward.toBase58()} />
      ),
    },
    {
      title: 'AMOUNT',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <Table
      dataSource={Object.values(tickets)}
      columns={columns}
      pagination={false}
    />
  )
}

export default Reward
