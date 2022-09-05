import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Col, Image, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'

import { useClaim } from 'hooks/actions/useClaim'
import { useTicket } from 'hooks/ticket/useTicket'
import { setCongratulate } from 'model/main.controller'

import BG from 'static/images/bg-popup.svg'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  ticket: string
  onSpinning: (amount: number, isMul: boolean) => void
}

const Congrats = ({ onClose, visible, ticket, onSpinning }: CongratsProps) => {
  const ticketData = useTicket(ticket)
  const { loading, onClaim } = useClaim()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCongratulate({ congratulate: true }))
    setTimeout(() => {
      dispatch(setCongratulate({ congratulate: false }))
    }, 5000)
  }, [dispatch])

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
          <RewardAvatar
            size={96}
            rewardAddress={ticketData.reward.toBase58()}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            <RewardAmount rewardAddress={ticketData.reward.toBase58()} />{' '}
            <RewardName rewardAddress={ticketData.reward.toBase58()} />
          </Typography.Title>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Button
            loading={loading}
            onClick={() => {
              onClaim(ticket)
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
          <Button
            size="large"
            block
            onClick={() => {
              onClose(false)
              onSpinning(1, false)
            }}
          >
            SPIN MORE
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congrats
