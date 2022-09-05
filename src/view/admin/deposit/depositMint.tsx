import { useState } from 'react'

import { Button, Col, InputNumber, Row, Typography } from 'antd'

import { useDepositReward } from 'hooks/admin/useDepositReward'
import { useReward } from 'hooks/reward/useReward'

const WithdrawMint = ({ rewardAddress }: { rewardAddress: string }) => {
  const [totalPrize, setTotalPrize] = useState('0')
  const rewardData = useReward(rewardAddress)
  const { onDepositReward, loading } = useDepositReward()

  const onDeposit = async () => {
    await onDepositReward({
      campaign: rewardData.campaign.toBase58(),
      reward: rewardAddress,
      mint: rewardData.mint.toBase58(),
      totalPrize: Number(totalPrize),
    })
  }

  return (
    <Row gutter={[12, 12]} justify="space-between">
      <Col>
        <Typography.Text>Total Prize:</Typography.Text>
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
        <Button onClick={onDeposit} block type="primary" loading={loading}>
          Deposit
        </Button>
      </Col>
    </Row>
  )
}

export default WithdrawMint
