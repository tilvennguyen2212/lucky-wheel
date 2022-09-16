import { Col, Row } from 'antd'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={16} lg={12}>
        <Col span={24}>{children}</Col>
      </Col>
    </Row>
  )
}

export default Layout
