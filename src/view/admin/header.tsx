import { Button, Col, Row, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCampaign } from 'model/main.controller'
import { useInitializeCampaign } from 'hooks/admin/useIntializeCampaign'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { AppState } from 'model'

const Header = () => {
  const dispatch = useDispatch()
  const campaigns = useSelector((state: AppState) => state.campaigns)
  const selectedCampaign = useSelectedCampaign()
  const { onInitializeCampaign } = useInitializeCampaign()

  return (
    <Row justify="end">
      <Col span={4} />
      <Col flex="auto">
        <Row justify="center">
          <Col>
            <Select
              style={{ width: 120 }}
              onChange={(campaign) => dispatch(setCampaign({ campaign }))}
              value={selectedCampaign}
            >
              {Object.keys(campaigns).map((address) => (
                <Select.Option key={address} value={address}>
                  {address}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Col>
      <Col span={4}>
        <Space direction="vertical" align="end" style={{ width: '100%' }}>
          <Button onClick={onInitializeCampaign}>New Campaign</Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Header
