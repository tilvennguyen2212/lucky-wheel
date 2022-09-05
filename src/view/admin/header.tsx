import { useDispatch, useSelector } from 'react-redux'
import { useAppRoute, useWalletAddress } from '@sentre/senhub'

import { Button, Select } from 'antd'
import { Descriptions, PageHeader, Tag, Space } from 'antd'

import { useInitializeCampaign } from 'hooks/admin/useIntializeCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { setCampaign } from 'model/main.controller'
import { AppState } from 'model'
import configs from 'configs'

const Header = () => {
  const dispatch = useDispatch()
  const campaigns = useSelector((state: AppState) => state.campaigns)
  const walletAddress = useWalletAddress()
  const selectedCampaign = useSelectedCampaign()
  const { onInitializeCampaign } = useInitializeCampaign()
  const { to } = useAppRoute(configs.manifest.appId)

  const campaignData = campaigns[selectedCampaign]
  const ownCampaign = walletAddress === campaignData.authority.toBase58()
  return (
    <PageHeader
      ghost={false}
      onBack={() => to('/dashboard')}
      title="Admin"
      subTitle={
        <Space>
          {selectedCampaign}
          {ownCampaign ? (
            <Tag color="success">Your Campaign</Tag>
          ) : (
            <Tag color="error">Not Have Permission</Tag>
          )}
        </Space>
      }
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      extra={[
        <Select
          style={{ width: 120 }}
          onChange={(campaign) => dispatch(setCampaign({ campaign }))}
          value={selectedCampaign}
          key="3"
        >
          {Object.keys(campaigns).map((address) => (
            <Select.Option key={address} value={address}>
              {address}
            </Select.Option>
          ))}
        </Select>,
        <Button key="2">Print Ticket</Button>,
        <Button key="1" type="primary" onClick={onInitializeCampaign}>
          New Campaign
        </Button>,
      ]}
    >
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Address">
          {selectedCampaign}
        </Descriptions.Item>
        <Descriptions.Item label="Ticket Token">
          {selectedCampaign}
        </Descriptions.Item>
        <Descriptions.Item label="Total Ticket">
          {campaignData.totalTicket.toNumber()}
        </Descriptions.Item>
        <Descriptions.Item label="Total Picked">
          {campaignData.totalPicked.toNumber()}
        </Descriptions.Item>
        <Descriptions.Item label="Authority">
          {campaignData.authority.toBase58()}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}

export default Header
