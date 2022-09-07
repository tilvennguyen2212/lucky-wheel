import { ReactNode } from 'react'
import { BN, web3 } from '@project-serum/anchor'
import { ChallengeRewardData } from '@sentre/lucky-wheel-core'

import { Col, Row, Space, Table, Typography } from 'antd'
import { MintAmount, MintAvatar, MintName } from '@sen-use/app'
import ColumnAction from './columnAction'

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'mint',
    key: 'mint',
    render: (mint: web3.PublicKey) => {
      return (
        <Space>
          <MintAvatar mintAddress={mint.toBase58()} size={32} />
          <MintName mintAddress={mint.toBase58()} />
        </Space>
      )
    },
  },
  {
    title: 'Amount',
    dataIndex: 'mint',
    key: 'mint',
    render: (mint: web3.PublicKey, { amount }: ChallengeRewardData) => {
      return <MintAmount mintAddress={mint.toBase58()} amount={amount} />
    },
  },

  {
    title: 'Reserve',
    dataIndex: 'reserve',
    key: 'reserve',
    render: (reserve: BN) => <Typography>{reserve.toNumber()}</Typography>,
  },

  {
    title: 'Total Picked',
    dataIndex: 'totalPicked',
    key: 'totalPicked',
    render: (totalPicked: BN) => (
      <Typography>{totalPicked.toNumber()}</Typography>
    ),
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
