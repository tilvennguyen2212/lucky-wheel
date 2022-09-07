import { Fragment, useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import {
  Button,
  Col,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
} from 'antd'

import { useCreateReward } from 'hooks/admin/useCreateReward'
import Ticket from 'static/images/ticket-icon.png'

const CreateTicketReward = ({
  campaignAddress,
}: {
  campaignAddress: string
}) => {
  const [visible, setVisible] = useState(false)
  const [prizeAmount, setPrizeAmount] = useState('0')
  const [ratio, setRatio] = useState('0')
  const { createReward, loading } = useCreateReward()

  const onCreate = async () => {
    const PDAs = await window.luckyWheel.deriveCampaignPDAs(
      new web3.PublicKey(campaignAddress),
    )
    await createReward({
      prizeAmount: new BN(prizeAmount),
      campaign: campaignAddress,
      rewardMint: PDAs.ticketMint,
      ratio: Number(ratio),
      rewardType: REWARD_TYPE.ticket,
    })
  }

  return (
    <Fragment>
      <Button block type="primary" onClick={() => setVisible(true)}>
        Add New
      </Button>
      <Modal
        title="Create Ticket Reward"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onCreate}
        confirmLoading={loading}
      >
        <Row justify="center" style={{ paddingBottom: 16 }}>
          <Col>
            <Image
              preview={false}
              style={{ height: 100, width: 100 }}
              src={Ticket}
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={10}>
            <Typography.Text>Prize Amount :</Typography.Text>
          </Col>
          <Col span={14}>
            <Input
              style={{ width: '100%' }}
              min="0"
              value={prizeAmount}
              onChange={(e) => setPrizeAmount(e.target.value)}
            />
          </Col>
          <Col span={10}>
            <Typography.Text>Ratio (%) :</Typography.Text>
          </Col>
          <Col span={14}>
            <InputNumber
              style={{ width: '100%' }}
              min="0"
              max="100"
              value={ratio}
              onChange={(val) => setRatio(val)}
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default CreateTicketReward
