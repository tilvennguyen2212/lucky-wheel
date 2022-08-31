import { useState } from 'react'
import { web3, BN } from '@project-serum/anchor'

import { REWARD_TYPE } from 'lucky-wheel-core'

import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'
import { NFTSelection, AvatarNFT } from '@sen-use/components'

import { notifyError, notifySuccess } from 'helper'

const CreateNftReward = ({ campaign }: { campaign: string }) => {
  const [selectedNft, setSelectedNft] = useState('')
  const [ratio, setRatio] = useState(0)
  const [loading, setLoading] = useState(false)

  async function onCreateMintReward() {
    setLoading(true)
    try {
      const reward = web3.Keypair.generate()
      const { tx: txReward } = await window.luckyWheel.initializeReward({
        campaign: new web3.PublicKey(campaign),
        rewardMint: new web3.PublicKey(selectedNft),
        prizeAmount: new BN(1),
        rewardType: REWARD_TYPE.nft,
        reward,
        sendAndConfirm: false,
      })
      const { tx: txDeposit } = await window.luckyWheel.depositReward({
        campaign: new web3.PublicKey(campaign),
        reward: reward.publicKey,
        totalPrize: new BN(1),
        mint: new web3.PublicKey(selectedNft),
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
      notifySuccess('Create NFT reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row justify="space-between" gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title> Create NFT Reward</Typography.Title>
      </Col>
      <Col>
        {!selectedNft ? (
          <Space direction="vertical">
            <Typography.Text type="secondary"> Select Nft </Typography.Text>
            <NFTSelection onSelect={setSelectedNft} />
          </Space>
        ) : (
          <Space>
            <AvatarNFT mintAddress={selectedNft} size={60} />
          </Space>
        )}
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

export default CreateNftReward
