import { Col, Row } from 'antd'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import CardNFT from './cardNFT'

const ListNftReward = ({ campaign }: { campaign: string }) => {
  const rewards = useRewardByCampaign(campaign)

  return (
    <Row gutter={[24, 24]} style={{ paddingTop: 32 }}>
      {Object.keys(rewards).map((rewardAddress) => {
        if (!rewards[rewardAddress].rewardType.nft) return null
        return (
          <Col span={24}>
            <CardNFT rewardAddress={rewardAddress} campaign={campaign} />
          </Col>
        )
      })}
    </Row>
  )
}

export default ListNftReward
