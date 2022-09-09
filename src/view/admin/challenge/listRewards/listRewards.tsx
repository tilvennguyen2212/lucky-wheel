import { ReactNode } from 'react'
import { BN } from '@project-serum/anchor'
import { ChallengeRewardData } from '@sentre/lucky-wheel-core'

import { Col, Row, Space, Table, Typography } from 'antd'
import ColumnAction from './columnAction'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'
import { MintAmount } from '@sen-use/app'

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => {
      return (
        <Space>
          <RewardAvatar rewardAddress={address} isChallenge={true} size={32} />
          <RewardName isChallenge={true} rewardAddress={address} />
        </Space>
      )
    },
  },
  {
    title: 'Amount',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => {
      return <RewardAmount rewardAddress={address} isChallenge={true} />
    },
  },

  {
    title: 'Reserve',
    dataIndex: 'reserve',
    key: 'reserve',
    render: (reserve: BN, { mint, rewardType }: ChallengeRewardData) => {
      if (!rewardType.token)
        return <Typography.Text>{reserve.toString()}</Typography.Text>

      return <MintAmount mintAddress={mint.toBase58()} amount={reserve} />
    },
  },

  {
    title: 'Total Picked',
    dataIndex: 'totalPicked',
    key: 'totalPicked',
    render: (totalPicked: BN) => {
      return <Typography.Text>{totalPicked.toString()}</Typography.Text>
    },
  },

  {
    title: 'Action',
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => <ColumnAction rewardAddress={address} />,
  },
]

const ListRewards = ({
  title,
  actionCreate,
  data,
}: {
  title: string
  actionCreate: ReactNode
  data: ({ address: string } & ChallengeRewardData)[]
}) => {
  return (
    <Row justify="center">
      <Col xs={24} lg={16}>
        <Table
          className="reward"
          key={title}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
                  {title}
                </Typography.Title>
              </Col>
              <Col>{actionCreate}</Col>
            </Row>
          )}
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
          style={{ width: '100%' }}
          rowKey={(record) => record.address}
        />
      </Col>
    </Row>
  )
}

export default ListRewards
