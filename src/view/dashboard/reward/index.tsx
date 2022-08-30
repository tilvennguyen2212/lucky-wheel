import { useMemo } from 'react'
import { TicketData } from 'lucky-wheel-core'
import { web3 } from '@project-serum/anchor'

import { Table } from 'antd'
import ColumnReward from './columnReward'

import { SENTRE_CAMPAIGN } from 'constant'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'

const Reward = () => {
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)

  const filterTickets = useMemo(() => {
    const usedTicket: TicketData[] = []
    for (const ticket of Object.values(tickets)) {
      const state = ticket.state
      if (state.claimed || state.won) usedTicket.push(ticket)
    }
    return usedTicket
  }, [tickets])

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
      dataIndex: 'reward',
      key: 'reward',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <Table dataSource={filterTickets} columns={columns} pagination={false} />
  )
}

export default Reward
