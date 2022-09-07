import { useState } from 'react'
import { web3, BN } from '@project-serum/anchor'

import { Button, Col, Row, Space, Typography } from 'antd'
import { AvatarNFT, NFTSelection } from '@sen-use/components'

import { notifyError, notifySuccess } from 'helper'
import { useReward } from 'hooks/reward/useReward'

const CardNFT = ({
  campaign,
  rewardAddress,
}: {
  campaign: string
  rewardAddress: string
}) => {
  const [mintNft, setMintNft] = useState('')
  const reward = useReward(rewardAddress)
  const { mint, prizeAmount, reservePrize, toLuckyNumber } = reward

  const onDeposit = async () => {
    try {
      const { txId } = await window.luckyWheel.depositReward({
        campaign: new web3.PublicKey(campaign),
        reward: new web3.PublicKey(rewardAddress),
        totalPrize: new BN(1),
        mint: new web3.PublicKey(mintNft),
        sendAndConfirm: true,
      })
      setMintNft('')
      return notifySuccess('Deposited', txId)
    } catch (err) {
      notifyError(err)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Mint Avatar</Typography.Text>
          <Space>
            <AvatarNFT mintAddress={mint.toBase58()} size={50} />
          </Space>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Prize Amount</Typography.Text>
          {prizeAmount.toNumber()}
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Reserve Prize</Typography.Text>
          <Typography.Text>{reservePrize.toNumber()}</Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary">Ratio</Typography.Text>
          <Typography.Text>
            {(Number(toLuckyNumber.toString()) / 10 ** 18) * 100}%
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Space size={24}>
          <NFTSelection
            onSelect={setMintNft}
            collectionAddress={[mint.toBase58()]}
          />
          <AvatarNFT mintAddress={mintNft || ''} size={50} />
          <Button onClick={onDeposit} disabled={!mintNft}>
            Deposit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default CardNFT
