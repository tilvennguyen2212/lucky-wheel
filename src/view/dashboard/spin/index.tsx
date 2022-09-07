import { useMemo } from 'react'

import { Button, Col, Divider, Row, Space, Typography } from 'antd'
import Icon from '@ant-design/icons'
import Wheel, { Material } from 'components/wheel'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useAvailableTickets } from 'hooks/lottery/useAvailableTickets'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useTotalUnclaimedTicket } from 'hooks/ticket/useTotalUnclaimedTicket'
import { useClaimTicket } from 'hooks/actions/useClaimTicket'

import { Reward } from 'constant'

import { ReactComponent as Ticket } from 'static/images/icons/ticket-icon.svg'

import './index.less'

const ANY_ART_URL = 'https://hub.sentre.io/app/any_arts?autoInstall=true'

const Spin = () => {
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)
  const tickets = useAvailableTickets(selectedCampaign)
  const { totalTicket } = useTotalUnclaimedTicket()
  const { loading: loadingRedeem, redeemTicket } = useClaimTicket()

  const formatReward = useMemo(() => {
    const material: Material[] = [
      {
        type: Reward.GoodLuck,
        rewardAddress: Reward.GoodLuck,
      },
    ]

    for (const address in rewards) {
      const { rewardType } = rewards[address]
      let type = Reward.Token
      if (rewardType.nftCollection) type = Reward.NFT
      if (rewardType.ticket) type = Reward.Ticket
      material.push({
        type,
        rewardAddress: address,
      })
    }

    return material
  }, [rewards])

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Wheel rewards={formatReward} />
      </Col>
      <Col span={24} className="remaining-ticket">
        <Row justify="center">
          <Col xs={24} sm={20} md={18} lg={16}>
            <Row justify="space-between" wrap={false} align="middle">
              <Col>
                <Space size={4} direction="vertical">
                  <Space className="space-middle-icon">
                    <Typography.Text>Remaining tickets:</Typography.Text>
                    <Typography.Title level={5} className="gradient-text">
                      {Object.keys(tickets).length}
                    </Typography.Title>
                    <Icon style={{ fontSize: 20 }} component={Ticket} />
                  </Space>
                  {!!totalTicket && (
                    <Space size={0}>
                      <Typography.Text>
                        You have {totalTicket} bonus tickets
                      </Typography.Text>
                      <Button
                        type="text"
                        onClick={redeemTicket}
                        loading={loadingRedeem}
                      >
                        Claim
                      </Button>
                    </Space>
                  )}
                </Space>
              </Col>
              <Col>
                <Divider
                  type="vertical"
                  style={{ borderColor: '#4E4F5C', height: 24 }}
                />
              </Col>
              <Col>
                <Button
                  onClick={() => window.open(ANY_ART_URL)}
                  style={{ marginLeft: -12 }}
                  type="text"
                >
                  Get more ticket
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Spin
