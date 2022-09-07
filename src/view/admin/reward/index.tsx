import { Col, Row } from 'antd'
import NftRewards from './listRewards/nftRewards'
import TicketRewards from './listRewards/ticketRewards'
import TokenRewards from './listRewards/tokenRewards'

const ManagementReward = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <TokenRewards />
      </Col>
      <Col span={24}>
        <NftRewards />
      </Col>
      <Col span={24}>
        <TicketRewards />
      </Col>
    </Row>
  )
}

export default ManagementReward
