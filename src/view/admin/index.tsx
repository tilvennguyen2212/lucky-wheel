import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { Col, Row } from 'antd'
import Header from './header'
import CreateReward from './createReward'
import MintRewardTable from './table/mintRewardTable'
import TicketRewardTable from './table/ticketRewardTable'

const CreateCampaign = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <CreateReward />
      </Col>
      <Col span={24}>
        <MintRewardTable rewardType={REWARD_TYPE.token} />
      </Col>
      <Col span={24}>
        <MintRewardTable rewardType={REWARD_TYPE.nft} />
      </Col>
      <Col span={24}>
        <TicketRewardTable />
      </Col>
    </Row>
  )
}

export default CreateCampaign
