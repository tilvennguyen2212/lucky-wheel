import { useMemo, useState } from 'react'
import { TicketData } from 'lucky-wheel-core'
import { web3 } from '@project-serum/anchor'

import { Col, Row, Space, Table, Typography, Switch } from 'antd'
import ColumnReward from './columnReward'
import ColumnAmount from './columnAmount'
import ColumnAction from './columnAction'

import { SENTRE_CAMPAIGN } from 'constant'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'

type History = TicketData & { ticketAddress: string }

const Reward = () => {
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)
  const [claimOnly, setClaimOnly] = useState(false)

  const filterTickets = useMemo(() => {
    const usedTicket: History[] = []
    for (const ticketAddress in tickets) {
      const ticketData = tickets[ticketAddress]
      const state = ticketData.state
      if ((state.claimed && !claimOnly) || state.won)
        usedTicket.push({ ...ticketData, ticketAddress })
    }
    return usedTicket
  }, [claimOnly, tickets])

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
      render: (reward: web3.PublicKey) => (
        <ColumnAmount rewardAddress={reward.toBase58()} />
      ),
    },
    {
      title: 'ACTIONS',
      dataIndex: 'ticketAddress',
      key: 'ticketAddress',
      render: (ticketAddress: string) => (
        <ColumnAction ticketAddress={ticketAddress} />
      ),
    },
  ]

  return (
    <Row gutter={[12, 12]}>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Space>
          <Typography.Text>Claim only</Typography.Text>
          <Switch onChange={setClaimOnly} size="small" />
        </Space>
      </Col>
      <Col span={24}>
        <Table
          dataSource={filterTickets}
          columns={columns}
          pagination={false}
        />
      </Col>
    </Row>
  )
}

export default Reward
