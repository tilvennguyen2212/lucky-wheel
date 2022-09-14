import { useMemo, useState } from 'react'
import { TicketData } from '@sentre/lucky-wheel-core'
import { web3, BN } from '@project-serum/anchor'
import { Infix, useInfix } from '@sentre/senhub'
import moment from 'moment'

import { Col, Row, Space, Table, Typography, Switch } from 'antd'
import ListReward from './listReward'
import ColumnAction from './columnAction'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

import './index.less'

export type History = TicketData & { ticketAddress: string }

const Reward = () => {
  const selectedCampaign = useSelectedCampaign()
  const tickets = useTicketByCampaign(selectedCampaign)
  const [claimOnly, setClaimOnly] = useState(false)
  const infix = useInfix()

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

  const sortedReward = filterTickets.sort((a, b) => {
    const time_a = a.pickAt.toNumber()
    const time_b = b.pickAt.toNumber()
    return time_b - time_a
  })

  const columns = [
    {
      title: 'TIME',
      dataIndex: 'pickAt',
      key: 'pickAt',
      render: (pickAt: BN) => (
        <Typography.Text>
          {moment(pickAt.toNumber() * 1000).format('MMM DD, YYYY HH:mm')}
        </Typography.Text>
      ),
    },
    {
      title: 'REWARD',
      dataIndex: 'reward',
      key: 'reward',
      render: (reward: web3.PublicKey) => (
        <Space>
          <RewardAvatar size={24} rewardAddress={reward.toBase58()} />
          <RewardName rewardAddress={reward.toBase58()} />
        </Space>
      ),
    },
    {
      title: 'AMOUNT',
      dataIndex: 'reward',
      key: 'reward',
      render: (reward: web3.PublicKey) => (
        <RewardAmount rewardAddress={reward.toBase58()} />
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
        {infix === Infix.xs ? (
          <ListReward history={sortedReward} />
        ) : (
          <Table
            dataSource={sortedReward}
            columns={columns}
            pagination={false}
            rowKey={(record) => record.ticketAddress}
          />
        )}
      </Col>
    </Row>
  )
}

export default Reward
