import { useMemo } from 'react'

import { Button, Col, Image, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardName } from 'components/reward/rewardName'

import { useClaim } from 'hooks/actions/useClaim'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

import BG from 'static/images/bg-popup.svg'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  resultReward: string
}

const Congrats = ({ onClose, visible, resultReward }: CongratsProps) => {
  const selectedCampaign = useSelectedCampaign()
  const tickets = useTicketByCampaign(selectedCampaign)
  const { loading, onClaim } = useClaim()

  const ticketAddress = useMemo(() => {
    for (const address in tickets) {
      const rewardAddress = tickets[address].reward.toBase58()
      if (rewardAddress === resultReward) return address
    }
    return ''
  }, [resultReward, tickets])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
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
          <Typography.Text>You have received a reward!</Typography.Text>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <RewardAvatar size={96} rewardAddress={resultReward} />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            <RewardName rewardAddress={resultReward} />
          </Typography.Title>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Button
            loading={loading}
            onClick={() => {
              onClaim(ticketAddress)
              onClose(false)
            }}
            size="large"
            type="primary"
            block
          >
            CLAIM
          </Button>
        </Col>
        <Col span={24}>
          <Button size="large" block onClick={() => onClose(false)}>
            SPIN MORE
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congrats
