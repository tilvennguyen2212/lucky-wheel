import { Button, Col, Row, Space, Typography } from 'antd'
import { useAppRouter } from 'hooks/useAppRouter'

const Dashboard = () => {
  const { pushHistory } = useAppRouter()
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Welcome to Lucky Wheel</Typography.Title>
      </Col>
      <Col span={24}>
        <Space>
          <Typography.Title level={4}>Create new Wheel</Typography.Title>
          <Button type="primary" onClick={() => pushHistory('/create-wheel')}>
            Create Wheel
          </Button>
          <Button>Ghost</Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Dashboard
