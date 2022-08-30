import { Col, Divider, Row, Space, Typography } from 'antd'
import Layout from 'components/layout'
import Icon from '@ant-design/icons'
import Wheel, { Material } from 'components/wheel'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

import { ReactComponent as Ticket } from 'static/images/icons/ticket-icon.svg'
import { Reward, SENTRE_CAMPAIGN } from 'constant'

import './index.less'

const DEFAULT_REWARD: Material[] = [
  {
    type: Reward.GoodLuck,
    value: 'good luck 1',
  },
  {
    type: Reward.GoodLuck,
    value: 'good luck 2',
  },
  {
    type: Reward.GoodLuck,
    value: 'good luck 3',
  },
  {
    type: Reward.GoodLuck,
    value: 'good luck 4',
  },
  {
    type: Reward.GoodLuck,
    value: 'good luck 5',
  },
]

const Spin = () => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  console.log(rewards, 'rewards')

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Wheel rewards={DEFAULT_REWARD} />
      </Col>
      <Col span={24} className="remaining-ticket">
        <Layout>
          <Row justify="space-between" wrap={false}>
            <Col>
              <Space className="space-middle-icon">
                <Typography.Text>Remaining tickets:</Typography.Text>
                <Typography.Title level={5} className="gradient-text">
                  2
                </Typography.Title>
                <Icon style={{ fontSize: 20 }} component={Ticket} />
              </Space>
            </Col>
            <Col>
              <Divider
                type="vertical"
                style={{ borderColor: '#4E4F5C', height: 24 }}
              />
            </Col>
            <Col>
              <Typography.Text>Remaining tickets: 2 </Typography.Text>
            </Col>
          </Row>
        </Layout>
      </Col>
    </Row>
  )
}

export default Spin
