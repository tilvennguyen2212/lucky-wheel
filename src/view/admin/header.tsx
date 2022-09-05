import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAppRoute,
  useGetMintData,
  useWalletAddress,
  util,
} from '@sentre/senhub'
import { web3 } from '@project-serum/anchor'

import { Button, Col, Row, Select, Statistic, Typography } from 'antd'
import { Descriptions, PageHeader, Tag, Space } from 'antd'
import PrintTicket from './printTicket'

import { useInitializeCampaign } from 'hooks/admin/useIntializeCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { setCampaign } from 'model/main.controller'
import { AppState } from 'model'

import configs from 'configs'

const Header = () => {
  const campaigns = useSelector((state: AppState) => state.campaigns)
  const [ticketMint, setTicketMint] = useState('')
  const [totalMintTicket, setTotalMintTicket] = useState(0)
  const walletAddress = useWalletAddress()
  const selectedCampaign = useSelectedCampaign()
  const { to } = useAppRoute(configs.manifest.appId)
  const { onInitializeCampaign } = useInitializeCampaign()
  const getMintData = useGetMintData()
  const dispatch = useDispatch()

  const campaignData = campaigns[selectedCampaign]

  const isOwn = (campaignAddr: string) => {
    return walletAddress === campaigns[campaignAddr]?.authority.toBase58()
  }

  const getTicketMint = useCallback(async () => {
    const PDAs = await window.luckyWheel.deriveCampaignPDAs(
      new web3.PublicKey(selectedCampaign),
    )
    const mintAddress = PDAs.ticketMint.toBase58()
    let totalMint = 0
    try {
      const mintData = await getMintData({ mintAddress })
      if (mintData !== undefined)
        totalMint = Number(mintData[mintAddress].supply.toString())
    } catch (error) {}
    setTotalMintTicket(totalMint)
    return setTicketMint(mintAddress)
  }, [getMintData, selectedCampaign])
  useEffect(() => {
    getTicketMint()
  }, [getTicketMint])

  return (
    <PageHeader
      ghost={false}
      onBack={() => to('/dashboard')}
      title="Admin"
      subTitle={
        <Space>
          {selectedCampaign}
          {isOwn(selectedCampaign) ? (
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
              <Typography.Text
                style={{ color: isOwn(address) ? undefined : 'red' }}
              >
                {address}
              </Typography.Text>
            </Select.Option>
          ))}
        </Select>,
        <PrintTicket key="2" campaignAddress={selectedCampaign} />,
        <Button key="1" type="primary" onClick={onInitializeCampaign}>
          New Campaign
        </Button>,
      ]}
    >
      <Row gutter={[24, 24]} style={{ paddingLeft: 32 }}>
        <Col span={17}>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="Address">
              {selectedCampaign}
            </Descriptions.Item>
            <Descriptions.Item label="Ticket Token">
              {ticketMint}
            </Descriptions.Item>
            <Descriptions.Item label="Authority">
              {util.shortenAddress(campaignData?.authority.toBase58() || '', 8)}
            </Descriptions.Item>
            <Descriptions.Item label="Picker">
              {util.shortenAddress(
                Buffer.from(campaignData?.picker || []).toString('hex'),
                8,
              )}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span="auto">
          <Space size={32}>
            <Statistic
              title="Total Ticket"
              value={campaignData?.totalTicket.toNumber()}
            />
            <Statistic
              title="Total Picked"
              value={campaignData?.totalPicked.toNumber()}
            />
            <Statistic title="Total Ticket Mint" value={totalMintTicket} />
          </Space>
        </Col>
      </Row>
    </PageHeader>
  )
}

export default Header
