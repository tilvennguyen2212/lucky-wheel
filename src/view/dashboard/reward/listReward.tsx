import moment from 'moment'

import { Card, Col, Empty, Row, Space, Typography } from 'antd'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'
import ColumnAction from './columnAction'

import { History } from './index'

type ListRewardProps = {
  history: History[]
}

const ListReward = ({ history }: ListRewardProps) => {
  return (
    <Card bodyStyle={{ padding: 16 }} className="list-reward" bordered={false}>
      {!history.length ? (
        <Empty description="You don't have any reward" />
      ) : (
        <Row gutter={[16, 16]}>
          {history.map(({ reward, ticketAddress, pickAt }) => (
            <Col span={24} key={ticketAddress} className="list-reward_item">
              <Row align="top">
                <Col flex="auto">
                  <Space direction="vertical">
                    <Space>
                      <RewardAvatar
                        size={24}
                        rewardAddress={reward.toBase58()}
                      />
                      <RewardAmount rewardAddress={reward.toBase58()} />
                      <RewardName rewardAddress={reward.toBase58()} />
                    </Space>
                    <Typography.Text type="secondary">
                      {moment(pickAt.toNumber() * 1000).format(
                        'MMM DD, YYYY HH:mm',
                      )}
                    </Typography.Text>
                  </Space>
                </Col>
                <Col>
                  <ColumnAction ticketAddress={ticketAddress} />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  )
}

export default ListReward
