import { useMemo } from 'react'

import { Avatar, Button, Col, Image, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintAvatar, MintSymbol } from '@sen-use/app'

import { useClaim } from 'hooks/actions/useClaim'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'

import Ticket from 'static/images/ticket-icon.png'
import BG from 'static/images/bg-popup.svg'
import { useMintDecimals, util } from '@sentre/senhub/dist'
import { utilsBN } from '@sen-use/web3/dist'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  resultReward: string
}

const Congrats = ({ onClose, visible, resultReward }: CongratsProps) => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const tickets = useTicketByCampaign(SENTRE_CAMPAIGN)
  const { mint, prizeAmount, rewardType } = rewards[resultReward]
  const decimals = useMintDecimals({ mintAddress: mint.toBase58() }) || 0
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
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          {rewardType.token ? (
            <MintAvatar size={96} mintAddress={mint.toBase58()} />
          ) : (
            <Avatar size={96} src={Ticket} shape="square" />
          )}
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            {rewardType.nftCollection
              ? 1
              : util
                  .numeric(utilsBN.undecimalize(prizeAmount, decimals))
                  .format('0,0.[0000]')}{' '}
            {rewardType.nftCollection ? (
              <MintSymbol mintAddress={mint.toBase58()} />
            ) : (
              'Ticket'
            )}
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
