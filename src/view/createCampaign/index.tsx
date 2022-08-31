import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BN, web3 } from '@project-serum/anchor'

import { Button, Col, Row, Space, Typography } from 'antd'

import configs from 'configs'
import { useWalletAddress } from '@sentre/senhub/dist'
import { notifyError, notifySuccess } from 'helper'
import CampaignManagement from './management'
import { useSpin } from 'hooks/actions/useSpin'
import { useAvailableTickets } from 'hooks/lottery/useAvailableTickets'

const CreateCampaign = () => {
  const [ownCampaign, setOwnLottery] = useState(
    'WBKP7DASZbdhDrcgFPUSpd8uJ9qVUDe7L2HX9a3tPNe',
  )
  const [loading, setLoading] = useState(false)
  const wallet = useWalletAddress()
  const onSpin = useSpin(ownCampaign)
  const availableTickets = useAvailableTickets(ownCampaign)

  async function onInitializeCampaign() {
    try {
      setLoading(true)
      const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
        withCredentials: true,
      })
      const pickerPublickey = await window.luckyWheel.decodePickerPublickey(
        picker,
      )
      const { txId } = await window.luckyWheel.initializeCampaign({
        picker: pickerPublickey,
        startDate: new BN(0),
        endDate: new BN(0),
      })
      notifySuccess('Create campaign', txId)
      fetchOwnLottery()
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOwnLottery = useCallback(async () => {
    if (!!ownCampaign) return
    const campaigns = await window.luckyWheel.account.campaign.all()
    for (let campaign of campaigns) {
      if (campaign.account.authority.toBase58() === wallet)
        return setOwnLottery(campaign.publicKey.toBase58())
    }
  }, [ownCampaign, wallet])

  useEffect(() => {
    fetchOwnLottery()
  }, [fetchOwnLottery])

  async function onCreateTicket() {
    setLoading(true)
    try {
      const { txId } = await window.luckyWheel.initializeTicket({
        campaign: new web3.PublicKey(ownCampaign),
      })
      notifySuccess('Create Ticket', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Space direction="vertical">
          <Typography.Text>{ownCampaign}</Typography.Text>
          <Space>
            <Button
              onClick={onInitializeCampaign}
              type="primary"
              loading={loading}
            >
              Create Campaign
            </Button>
            <Button onClick={onCreateTicket} type="primary" loading={loading}>
              Create Ticket
            </Button>
            <Button onClick={onSpin} type="primary" loading={loading}>
              Spin ({Object.keys(availableTickets).length})
            </Button>
          </Space>
        </Space>
      </Col>
      <Col style={{ maxWidth: 1200 }}>
        <CampaignManagement campaign={ownCampaign} />
      </Col>
    </Row>
  )
}

export default CreateCampaign
