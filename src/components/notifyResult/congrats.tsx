import { MintAmount, MintAvatar, MintSymbol } from '@sen-use/app/dist'
import IonIcon from '@sentre/antd-ionicon'

import { useMemo } from 'react'

import { Button, Col, Image, Modal, Row, Typography } from 'antd'

import { useClaim } from 'hooks/lottery/useClaim'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'
import { SENTRE_CAMPAIGN } from 'constant'

import BG from 'static/images/bg-popup.svg'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  resultReward: string
}

const Congrats = ({ onClose, visible, resultReward }: CongratsProps) => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)
  const { loading, onClaim } = useClaim()

  const ticketAddress = useMemo(() => {
    for (const address in tickets) {
      const rewardAddress = tickets[address].reward.toBase58()
      if (rewardAddress === resultReward) return address
    }
    return ''
  }, [resultReward, tickets])

  const { mint, prizeAmount, rewardType } = rewards[resultReward]
  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      footer={null}
      closeIcon={<IonIcon name="close-outline" />}
      className="congrats"
    >
      <Image preview={false} src={BG} />
      <Row gutter={[16, 16]} className="congrats_content">
        <Col span={24}>
          <Typography.Title level={4} className="gradient-text">
            Congratulations!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>You have received a reward!</Typography.Text>
        </Col>
        <Col span={24} />
        {/** Safe place */}
        <Col span={24}>
          <MintAvatar size={96} mintAddress={mint.toBase58()} />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            {rewardType.token && (
              <MintAmount mintAddress={mint.toBase58()} amount={prizeAmount} />
            )}
            {rewardType.nftCollection && 1}
            <MintSymbol mintAddress={mint.toBase58()} />
          </Typography.Title>
        </Col>
        <Col span={24} />
        {/** Safe place */}
        <Col span={24}>
          <Button
            loading={loading}
            onClick={() => onClaim(ticketAddress)}
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
