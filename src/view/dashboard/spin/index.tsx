import { useMemo } from 'react'

import { Button, Col, Divider, Row, Space, Typography } from 'antd'
import Layout from 'components/layout'
import Icon from '@ant-design/icons'
import Wheel, { Material } from 'components/wheel'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

import { ReactComponent as Ticket } from 'static/images/icons/ticket-icon.svg'
import { Reward, SENTRE_CAMPAIGN } from 'constant'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'

import './index.less'

const Spin = () => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)

  const formatReward = useMemo(() => {
    const material: Material[] = []
    for (const { mint, prizeAmount } of rewards)
      material.push({
        type: Reward.Token,
        value: mint.toBase58(),
        amount: prizeAmount.toString(),
      })
    return material
  }, [rewards])

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Wheel rewards={formatReward} />
      </Col>
      <Col span={24} className="remaining-ticket">
        <Layout>
          <Row justify="space-between" wrap={false} align="middle">
            <Col>
              <Space className="space-middle-icon">
                <Typography.Text>Remaining tickets:</Typography.Text>
                <Typography.Title level={5} className="gradient-text">
                  {tickets.length}
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
              <Button style={{ marginLeft: -12 }} type="text">
                Get more ticket
              </Button>
            </Col>
          </Row>
        </Layout>
      </Col>
    </Row>
  )
}

export default Spin
