import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'

import { useWithdrawReward } from 'hooks/admin/useWithdrawReward'
import { useReward } from 'hooks/reward/useReward'
import { useState } from 'react'

const WithdrawMint = ({ rewardAddress }: { rewardAddress: string }) => {
  const [totalPrize, setTotalPrize] = useState('0')
  const rewardData = useReward(rewardAddress)
  const { withdrawReward, loading } = useWithdrawReward()

  const onWithdraw = async () => {
    await withdrawReward({
      totalPrize: Number(totalPrize),
      mint: rewardData.mint.toBase58(),
      reward: rewardAddress,
    })
  }

  return (
    <Row gutter={[12, 12]} justify="space-between">
      <Col>
        <Typography.Text>Total Prize:</Typography.Text>
      </Col>
      <Col span="auto">
        <Space>
          <Typography.Text
            type="secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => setTotalPrize(rewardData.reservePrize.toString())}
          >
            Available: {rewardData.reservePrize.toNumber()}
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
