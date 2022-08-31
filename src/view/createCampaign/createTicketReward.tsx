import { useState } from 'react'
import { web3, BN } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3'
import { REWARD_TYPE } from 'lucky-wheel-core'
import { useGetMintDecimals } from '@sentre/senhub'

import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'
import { MintSelection } from '@sen-use/app'

import { notifyError, notifySuccess } from 'helper'

const CreateMintReward = ({ campaign }: { campaign: string }) => {
  const [selectedMint, setSelectedMint] = useState('')
  const [totalPrize, setTotalPrize] = useState(0)
  const [prizeAmount, setPrizeAmount] = useState(0)
  const [ratio, setRatio] = useState(0)
  const [loading, setLoading] = useState(false)
  const getMintDecimals = useGetMintDecimals()

  async function onCreateMintReward() {
    setLoading(true)
    try {
      const decimals = await getMintDecimals({ mintAddress: selectedMint })
      if (!decimals) throw new Error("Can't get mint decimals")

      const prizeAmountBN = utilsBN.decimalize(prizeAmount, decimals)
      const reward = web3.Keypair.generate()

      const { tx: txReward } = await window.luckyWheel.initializeReward({
        campaign: new web3.PublicKey(campaign),
        rewardMint: new web3.PublicKey(selectedMint),
        prizeAmount: prizeAmountBN,
        rewardType: REWARD_TYPE.token,
        reward,
        sendAndConfirm: false,
      })

      const { tx: txDeposit } = await window.luckyWheel.depositReward({
        campaign: new web3.PublicKey(campaign),
        reward: reward.publicKey,
        totalPrize: new BN(totalPrize),
        mint: new web3.PublicKey(selectedMint),
        sendAndConfirm: false,
      })

      const toLuckyNumber = new BN('1' + '0'.repeat(18))
        .mul(new BN(ratio * 10 ** 9))
        .div(new BN(100 * 10 ** 9))
      const { tx: txLuckyRatio } = await window.luckyWheel.updateLuckyRatio({
        campaign: new web3.PublicKey(campaign),
        reward: reward.publicKey,
        fromLuckyNumber: new BN(0),
        toLuckyNumber: toLuckyNumber,
        sendAndConfirm: false,
      })

      const tx = new web3.Transaction()
      tx.add(txReward)
      tx.add(txDeposit)
      tx.add(txLuckyRatio)

      const txId = await window.luckyWheel.provider.sendAndConfirm(tx, [reward])
      notifySuccess('Create reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row justify="space-between" gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title> Create Mint Reward</Typography.Title>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary"> Select Mint </Typography.Text>
          <MintSelection onChange={setSelectedMint} value={selectedMint} />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary"> Total Prize </Typography.Text>
          <InputNumber onChange={setTotalPrize} value={totalPrize} />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary"> Prize Amount </Typography.Text>
          <InputNumber onChange={setPrizeAmount} value={prizeAmount} />
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary"> Ratio </Typography.Text>
          <InputNumber onChange={setRatio} value={ratio} />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          onClick={onCreateMintReward}
          type="primary"
          loading={loading}
          block
        >
          Create Reward
        </Button>
      </Col>
    </Row>
  )
}

export default CreateMintReward
