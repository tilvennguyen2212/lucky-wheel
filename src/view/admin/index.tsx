import { Col, Row } from 'antd'
import Header from './header'
import TokenRewards from './listRewards/tokenRewards'

import NftRewards from './listRewards/nftRewards'
import TicketRewards from './listRewards/ticketRewards'

const Admin = () => {
  return (
    <Row gutter={[24, 24]}>
      <Header />
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

export default Admin
