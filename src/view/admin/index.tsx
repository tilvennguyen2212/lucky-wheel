import { Col, Row } from 'antd'
import Header from './header'
import CreateReward from './createReward'
import ListReward from './listRewards'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

const Admin = () => {
  const campaignId = useSelectedCampaign()
  const rewards = useRewardByCampaign(campaignId)

  const wrapListRewardData = (rewardAddrs: string[]) => {
    return rewardAddrs.map((address) => {
      return { address, ...rewards[address] }
    })
  }

  const tokenRewards = Object.keys(rewards).filter(
    (addr) => !!rewards[addr].rewardType.token,
  )

  const collectionRewards = Object.keys(rewards).filter(
    (addr) => !!rewards[addr].rewardType.nftCollection,
  )

  const ticketRewards = Object.keys(rewards).filter(
    (addr) => !!rewards[addr].rewardType.ticket,
  )

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <CreateReward />
      </Col>
      <Col span={24}>
        <ListReward
          data={wrapListRewardData(tokenRewards)}
          title="Token rewards"
        />
      </Col>
      <Col span={24}>
        <ListReward
          data={wrapListRewardData(collectionRewards)}
          title="Collection rewards"
        />
      </Col>
      <Col span={24}>
        <ListReward
          data={wrapListRewardData(ticketRewards)}
          title="Ticket rewards"
        />
      </Col>
    </Row>
  )
}

export default Admin
