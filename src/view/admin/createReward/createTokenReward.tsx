import { Fragment, useState } from 'react'
import { BN } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { Button, Col, Input, InputNumber, Modal, Row, Typography } from 'antd'
import { MintSelection } from '@sen-use/app'

import { useCreateReward } from 'hooks/admin/useCreateReward'

const CreateTokenReward = ({
  campaignAddress,
}: {
  campaignAddress: string
}) => {
  const [visible, setVisible] = useState(false)
  const [prizeAmount, setPrizeAmount] = useState('0')
  const [ratio, setRatio] = useState('0')
  const [mint, setMint] = useState('')
  const { createReward, loading } = useCreateReward()

  const onCreate = async () => {
    await createReward({
      prizeAmount: new BN(prizeAmount),
      campaign: campaignAddress,
      rewardMint: mint,
      ratio: Number(ratio),
      rewardType: REWARD_TYPE.token,
    })
  }

  return (
    <Fragment>
      <Button block type="primary" onClick={() => setVisible(true)}>
        Add New
      </Button>
      <Modal
        title="Create Token Reward"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onCreate}
        confirmLoading={loading}
      >
        <Row gutter={[24, 24]}>
          <Col span={10}>
            <Typography.Text>Token :</Typography.Text>
          </Col>
          <Col span={14}>
            <MintSelection onChange={setMint} />
          </Col>
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

export default CreateTokenReward
