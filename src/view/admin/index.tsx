import { useState } from 'react'

import { Col, Row, Segmented } from 'antd'
import Header from './header'
import ManagementReward from 'view/admin/reward'
import ManagementChallenge from 'view/admin/challenge'

const TABS = [
  {
    label: 'Management Reward',
    value: 'reward',
  },
  {
    label: 'Management Challenge Reward',
    value: 'challenge',
  },
]
const Admin = () => {
  const [id, setId] = useState('reward')
  return (
    <Row gutter={[24, 24]} justify="center">
      <Header />
      <Col span={10}>
        <Segmented
          value={id}
          onChange={(val) => setId(val.toString())}
          options={TABS}
          size="large"
        />
      </Col>
      <Col span={24}>
        {id === 'challenge' ? <ManagementChallenge /> : <ManagementReward />}
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default Admin
