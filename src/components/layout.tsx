import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Tooltip } from 'antd'
import RewardInfo from 'view/dashboard/rewardInfo'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Row justify="center" align="middle">
      <Col xs={24} md={16} lg={12}>
        <Col span={24}>{children}</Col>
      </Col>
      <Col style={{ position: 'absolute', top: 0, right: 0 }}>
        <Tooltip title="Reward Information">
          <Button
            type="text"
            icon={
              <IonIcon
                name="information-circle-outline"
                style={{ fontSize: 20 }}
              />
            }
            onClick={() => setVisible(true)}
            size="large"
          />
        </Tooltip>
      </Col>
      <RewardInfo visible={visible} onClose={setVisible} />
    </Row>
  )
}

export default Layout
