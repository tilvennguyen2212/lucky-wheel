import { useMemo, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { Button, Col, Divider, Row, Space, Typography } from 'antd'
import Layout from 'components/layout'
import Icon from '@ant-design/icons'
import Wheel, { Material } from 'components/wheel'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useAvailableTickets } from 'hooks/lottery/useAvailableTickets'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { notifyError, notifySuccess } from 'helper'
import { Reward } from 'constant'

import './index.less'
import { ReactComponent as Ticket } from 'static/images/icons/ticket-icon.svg'

const Spin = () => {
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)
  const tickets = useAvailableTickets(selectedCampaign)
  const [loading, setLoading] = useState(false)

  const formatReward = useMemo(() => {
    const material: Material[] = [
      {
        type: Reward.GoodLuck,
        rewardAddress: Reward.GoodLuck,
      },
    ]

    for (const address in rewards) {
      const { rewardType, reservePrize } = rewards[address]
      if (reservePrize.isZero()) continue
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

  const onCreateTicket = async () => {
    setLoading(true)
    try {
      const tx = new web3.Transaction()
      let signer: web3.Keypair[] = []
      for (let i = 0; i < 5; i++) {
        const ticket = web3.Keypair.generate()
        const { tx: txInit } = await window.luckyWheel.initializeTicket({
          campaign: new web3.PublicKey(selectedCampaign),
          ticket,
          sendAndConfirm: false,
        })
        tx.add(txInit)
        signer.push(ticket)
      }
      const txId = await window.luckyWheel.provider.sendAndConfirm(tx, signer)
      notifySuccess('Create 5 Ticket', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

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
                  {Object.keys(tickets).length}
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
              <Button
                style={{ marginLeft: -12 }}
                type="text"
                onClick={onCreateTicket}
                loading={loading}
              >
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
