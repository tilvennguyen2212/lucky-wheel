import { util } from '@sentre/senhub'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { RewardAvatar } from 'components/reward/rewardAvatar'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'

import { setConfetti, setTabId } from 'model/main.controller'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useAvailableTickets } from 'hooks/lottery/useAvailableTickets'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { TabId } from 'constant'
import { CONFETTI_CONGRATS, CONFETTI_DEFAULT } from 'model/main.controller'

import BG from 'static/images/bg-popup.svg'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  pickedTickets: string[]
  onSpinning: (amount: number, isMul: boolean) => void
}

const Congrats = ({
  onClose,
  visible,
  pickedTickets,
  onSpinning,
}: CongratsProps) => {
  const selectedCampaign = useSelectedCampaign()
  const availableTickets = useAvailableTickets(selectedCampaign)
  const tickets = useTicketByCampaign(selectedCampaign)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!visible) return
    ;(async () => {
      dispatch(setConfetti({ confetti: CONFETTI_CONGRATS }))
      await util.asyncWait(5000)
      dispatch(setConfetti({ confetti: CONFETTI_DEFAULT }))
    })()
  }, [dispatch, visible])

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
          <Typography.Text>
            You have received {pickedTickets.length} reward!
          </Typography.Text>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {pickedTickets.map((ticket) => {
              const rewardAddress = tickets[ticket].reward.toBase58()
              return (
                <Col span={pickedTickets.length === 1 ? 24 : 12} key={ticket}>
                  <Space size={16} direction="vertical">
                    <RewardAvatar size={96} rewardAddress={rewardAddress} />
                    <Typography.Title level={3}>
                      <RewardAmount rewardAddress={rewardAddress} />{' '}
                      <RewardName rewardAddress={rewardAddress} />
                    </Typography.Title>
                  </Space>
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Button
            onClick={() => {
              dispatch(setTabId({ tabId: TabId.Reward }))
              onClose(false)
            }}
            size="large"
            type="primary"
            block
          >
            GET YOUR REWARDS
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
            disabled={!Object.keys(availableTickets).length}
          >
            SPIN MORE
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congrats
