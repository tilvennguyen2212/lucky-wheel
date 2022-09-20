import { useEffect, useState } from 'react'
import { util } from '@sentre/senhub'

import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintAvatar, MintSymbol } from '@sen-use/app'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useGetLoseTickets } from 'hooks/lottery/useGetLoseTickets'
import { TicketState } from 'model/tickets.controller'
import { useCloseTickets } from 'hooks/actions/useCloseTickets'

import BG from 'static/images/bg-popup.svg'

const FEE_PER_ACCOUNT = 0.00174

const MINT_SOL = '11111111111111111111111111111111'

const SecretGift = () => {
  const [loseTickets, setLoseTickets] = useState<TicketState>()
  const [visible, setVisible] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const getLoseTickets = useGetLoseTickets(selectedCampaign)
  const { closeTickets, loading } = useCloseTickets()

  useEffect(() => {
    ;(async () => {
      if (loseTickets) return
      const tickets = await getLoseTickets()
      return setLoseTickets(tickets)
    })()
  }, [getLoseTickets, loseTickets])

  useEffect(() => {
    if (!loseTickets || visible) return
    if (Object.keys(loseTickets).length >= 1) setVisible(true)
  }, [loseTickets, visible])

  const onCloseTicket = async () => {
    if (!loseTickets) return
    await closeTickets(Object.keys(loseTickets))
    setLoseTickets({})
    return setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<IonIcon name="close-outline" />}
      className="congrats"
    >
      <Image preview={false} src={BG} style={{ borderRadius: 16 }} />
      <Row gutter={[16, 16]} className="congrats_content">
        <Col span={24}>
          <Typography.Title level={4} className="gradient-text">
            Congratulations!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>
            You are the lucky player who received a reward from the system.
          </Typography.Text>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Space size={16} direction="vertical">
            <MintAvatar size={96} mintAddress={MINT_SOL} />
            <Typography.Title level={3}>
              {util
                .numeric(
                  FEE_PER_ACCOUNT * Object.keys(loseTickets || {}).length,
                )
                .format('0,0[00000]')}{' '}
              <MintSymbol mintAddress={MINT_SOL} />
            </Typography.Title>
          </Space>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Button
            size="large"
            block
            type="primary"
            onClick={onCloseTicket}
            loading={loading}
          >
            CLAIM
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default SecretGift
