import { useState } from 'react'

import { Button, Col, InputNumber, Row, Typography } from 'antd'

import { useDepositChallengeReward } from 'hooks/challengeReward/useDepositChallengeReward'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'

const DepositMint = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const [amount, setAmount] = useState('0')
  const challengeRewardData = useChallengeRewardData(challengeRewardAddress)
  const { onDepositChallengeReward, loading } = useDepositChallengeReward()

  const onDeposit = async () => {
    await onDepositChallengeReward({
      campaign: challengeRewardData.campaign.toBase58(),
      challengeReward: challengeRewardAddress,
      mint: challengeRewardData.mint.toBase58(),
      amount: Number(amount),
    })
  }

  return (
    <Row gutter={[12, 12]} justify="space-between">
      <Col>
        <Typography.Text>amount:</Typography.Text>
      </Col>
      <Col span={24}>
        <InputNumber
          value={amount}
          onChange={setAmount}
          min="0"
          style={{ width: '100%' }}
        />
      </Col>

      <Col span={24}>
        <Button onClick={onDeposit} block type="primary" loading={loading}>
          Deposit
        </Button>
      </Col>
    </Row>
  )
}

export default DepositMint
