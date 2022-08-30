import { MintAmount, MintAvatar, MintSymbol } from '@sen-use/app'
import { Col, Row, Space, Typography } from 'antd'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

const ListMintReward = ({ campaign }: { campaign: string }) => {
  const rewards = useRewardByCampaign(campaign)

  return (
    <Row gutter={[24, 24]} style={{ paddingTop: 32 }}>
      {Object.values(rewards).map((reward) => {
        if (!reward.rewardType.token) return null
        return (
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Mint Avatar
                  </Typography.Text>
                  <Space>
                    <MintAvatar mintAddress={reward.mint} size={32} />
                    <MintSymbol mintAddress={reward.mint} />
                  </Space>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Prize Amount
                  </Typography.Text>
                  <MintAmount
                    mintAddress={reward.mint}
                    amount={reward.prizeAmount}
                  />
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Reserve Prize
                  </Typography.Text>
                  <Typography.Text>
                    {reward.reservePrize.toNumber()}
                  </Typography.Text>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">Ratio</Typography.Text>
                  <Typography.Text>
                    {(Number(reward.toLuckyNumber.toString()) / 10 ** 18) * 100}
                    %
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}

export default ListMintReward
