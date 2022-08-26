import { Row, Col } from 'antd'
import Wheel from './wheel'

const View = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={12} lg={8} style={{ marginTop: 52 }}>
        <Wheel />
      </Col>
    </Row>
  )
}

export default View
