import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'

import { useWithdrawChallengeReward } from 'hooks/challengeReward/useWithdrawChallengeReward'
import { useState } from 'react'

const WithdrawMint = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const [totalPrize, setTotalPrize] = useState('0')
  const rewardChallengeData = useChallengeRewardData(challengeRewardAddress)
  const { withdrawChallengeReward, loading } = useWithdrawChallengeReward()

  const onWithdraw = async () => {
    await withdrawChallengeReward({
      amount: Number(totalPrize),
      mint: rewardChallengeData.mint.toBase58(),
      challengeReward: challengeRewardAddress,
    })
  }

  return (
    <Row gutter={[12, 12]} justify="space-between">
      <Col>
        <Typography.Text>Total Prize:</Typography.Text>
      </Col>
      <Col span="auto">
        <Space>
          <Typography.Text type="secondary">
            Available: {rewardChallengeData.reserve.toNumber()}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <InputNumber
          value={totalPrize}
          onChange={setTotalPrize}
          min="0"
          style={{ width: '100%' }}
        />
      </Col>

      <Col span={24}>
        <Button onClick={onWithdraw} block type="primary" loading={loading}>
          Withdraw
        </Button>
      </Col>
    </Row>
  )
}

export default WithdrawMint
