import { useEffect } from 'react'
import { Button, Col, Row, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCampaign } from 'model/main.controller'
import { useOwnerCampaign } from 'hooks/campaign/useOwnerCampaign'
import { useInitializeCampaign } from 'hooks/admin/useIntializeCampaign'
import { AppState } from 'model'

const { Option } = Select

const Header = () => {
  const campaign = useSelector((state: AppState) => state.main.campaign)
  const dispatch = useDispatch()
  const ownerCampaigns = useOwnerCampaign()
  const { onInitializeCampaign } = useInitializeCampaign()
  const campaignAddresses = Object.keys(ownerCampaigns)

  useEffect(() => {
    dispatch(setCampaign({ campaign: Object.keys(ownerCampaigns)[0] }))
  }, [dispatch, ownerCampaigns])

  return (
    <Row justify="end">
      <Col span={4} />
      <Col flex="auto">
        <Row justify="center">
          <Col>
            <Select
              style={{ width: 120 }}
              onChange={(val) => dispatch(setCampaign({ campaign: val }))}
              value={campaign}
            >
              {campaignAddresses.map((address) => (
                <Option key={address} value={address}>
                  {address}
                </Option>
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
