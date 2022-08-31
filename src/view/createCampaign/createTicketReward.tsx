import { useCallback, useEffect, useState } from 'react'
import { web3, BN } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'
import { util } from '@sentre/senhub'

import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'

import { notifyError, notifySuccess } from 'helper'

const CreateTicketReward = ({ campaign }: { campaign: string }) => {
  const [selectedMint, setSelectedMint] = useState('')
  const [totalPrize, setTotalPrize] = useState(0)
  const [prizeAmount, setPrizeAmount] = useState(0)
  const [ratio, setRatio] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchTicketMint = useCallback(async () => {
    if (!!selectedMint || !campaign) return
    const { ticketMint } = await window.luckyWheel.deriveCampaignPDAs(
      new web3.PublicKey(campaign),
    )
    return setSelectedMint(ticketMint.toBase58())
  }, [campaign, selectedMint])

  async function onCreateMintReward() {
    setLoading(true)
    try {
      const reward = web3.Keypair.generate()
      const { tx: txInitTicket } = await window.luckyWheel.printTicketMint({
        campaign: new web3.PublicKey(campaign),
        amount: new BN(totalPrize * prizeAmount),
        sendAndConfirm: false,
      })
      const { tx: txReward } = await window.luckyWheel.initializeReward({
        campaign: new web3.PublicKey(campaign),
        rewardMint: new web3.PublicKey(selectedMint),
        prizeAmount: new BN(prizeAmount),
        rewardType: REWARD_TYPE.ticket,
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
      tx.add(txInitTicket)
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

  useEffect(() => {
    fetchTicketMint()
  }, [fetchTicketMint])

  return (
    <Row justify="space-between" gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title> Create Mint Reward</Typography.Title>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text type="secondary"> Ticket Mint </Typography.Text>
          <Typography.Text>{util.shortenAddress(selectedMint)}</Typography.Text>
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
      <Col span={24} />
    </Row>
  )
}

export default CreateTicketReward
