import { BN } from '@project-serum/anchor'
import { RewardData } from '@sentre/lucky-wheel-core'

import { Col, Row, Space, Table, Typography } from 'antd'
import RewardRatio from 'components/reward/rewardRatio'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'
import ColumnAction from './columnAction'

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'address',
    key: 'address',
    render: (rewardAddress: string) => {
      return (
        <Space>
          <RewardAvatar rewardAddress={rewardAddress} size={32} />
          <RewardName rewardAddress={rewardAddress} />
        </Space>
      )
    },
  },
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
    dataIndex: 'address',
    key: 'address',
    render: (address: string) => <ColumnAction rewardAddress={address} />,
  },
]

const ListReward = ({
  title,
  data,
}: {
  title: string
  data: ({ address: string } & RewardData)[]
}) => {
  return (
    <Row justify="center">
      <Col xs={24} lg={16}>
        <Table
          className="reward"
          key={title}
          title={() => (
            <Row justify="center">
              <Col>
                <Typography.Title level={5} style={{ fontWeight: 'bold' }}>
                  {title}
                </Typography.Title>
              </Col>
            </Row>
          )}
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
          style={{ width: '100%' }}
        />
      </Col>
    </Row>
  )
}

export default ListReward
