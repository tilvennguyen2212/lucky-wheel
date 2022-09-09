import { useState } from 'react'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals, util } from '@sentre/senhub'
import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'

import { useWithdrawChallengeReward } from 'hooks/challengeReward/useWithdrawChallengeReward'

const WithdrawMint = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const [totalPrize, setTotalPrize] = useState('0')
  const rewardChallengeData = useChallengeRewardData(challengeRewardAddress)
  const { withdrawChallengeReward, loading } = useWithdrawChallengeReward()
  const mintDecimals =
    useMintDecimals({ mintAddress: rewardChallengeData.mint.toBase58() }) || 0

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
          <Typography.Text
            type="secondary"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setTotalPrize(
                utilsBN.undecimalize(rewardChallengeData.reserve, mintDecimals),
              )
            }
          >
            Available:{' '}
            {util
              .numeric(
                utilsBN.undecimalize(rewardChallengeData.reserve, mintDecimals),
              )
              .format('0,0.[0000]')}
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
