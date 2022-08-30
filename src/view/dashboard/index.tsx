import { useState } from 'react'

import { Col, Row, Segmented } from 'antd'
import Container from './container'
import Layout from 'components/layout'

import { LUCKY_WHEEL_TABS, TabId } from 'constant'

const Dashboard = () => {
  const [tabId, setTabId] = useState<string>(TabId.Spin)

  return (
    <Layout>
      <Row gutter={[64, 64]} style={{ paddingBottom: 24 }}>
        <Col span={24}>
          <Segmented
            value={tabId}
            onChange={(val) => setTabId(val.toString())}
            options={LUCKY_WHEEL_TABS}
            size="large"
          />
        </Col>
        <Col span={24}>
          <Container tabId={tabId} />
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard
