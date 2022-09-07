import { Fragment, useState } from 'react'
import { useGetMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'
import { BN } from '@project-serum/anchor'

import { Button, Col, Input, InputNumber, Modal, Row, Typography } from 'antd'
import { MintSelection } from '@sen-use/app'

import { useCreateChallengeReward } from 'hooks/challengeReward/useCreateChallengeReward'

const CreateTokenReward = ({
  campaignAddress,
}: {
  campaignAddress: string
}) => {
  const [visible, setVisible] = useState(false)
  const [prizeAmount, setPrizeAmount] = useState('0')
  const [totalPicked, setTotalPicked] = useState('0')
  const [mint, setMint] = useState('')
  const { createChallengeReward, loading } = useCreateChallengeReward()

  const getMintDecimals = useGetMintDecimals()

  const onCreate = async () => {
    const decimals = await getMintDecimals({ mintAddress: mint })
    if (!decimals) throw new Error('Cant not find decimals')

    const amountBN = utilsBN.decimalize(prizeAmount, decimals)
    await createChallengeReward({
      amount: amountBN,
      campaign: campaignAddress,
      rewardMint: mint,
      totalPicked: new BN(totalPicked),
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
            <Typography.Text>Token:</Typography.Text>
          </Col>
          <Col span={14}>
            <MintSelection onChange={setMint} />
          </Col>
          <Col span={10}>
            <Typography.Text> Amount:</Typography.Text>
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
            <Typography.Text>Total picked:</Typography.Text>
          </Col>
          <Col span={14}>
            <InputNumber
              style={{ width: '100%' }}
              min="0"
              value={totalPicked}
              onChange={(val) => setTotalPicked(val)}
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default CreateTokenReward
