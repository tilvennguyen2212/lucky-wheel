import { Col, Row, Space, Typography } from 'antd'
import { AvatarNFT } from '@sen-use/components'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

const ListNftReward = ({ campaign }: { campaign: string }) => {
  const rewards = useRewardByCampaign(campaign)

  return (
    <Row gutter={[24, 24]} style={{ paddingTop: 32 }}>
      {rewards.map((reward) => {
        if (!reward.rewardType.nft) return null
        return (
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Mint Avatar
                  </Typography.Text>
                  <Space>
                    <AvatarNFT mintAddress={reward.mint.toBase58()} size={50} />
                  </Space>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Prize Amount
                  </Typography.Text>
                  {reward.prizeAmount.toNumber()}
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

export default ListNftReward
