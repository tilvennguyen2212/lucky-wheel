import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BN } from '@project-serum/anchor'

import { Button, Col, Row } from 'antd'

import './index.less'
import configs from 'configs'
import { useWalletAddress } from '@sentre/senhub/dist'
import { notifyError, notifySuccess } from 'helper'
import CampaignManagement from './management'

const CreateCampaign = () => {
  const [ownCampaign, setOwnLottery] = useState('')
  const [loading, setLoading] = useState(false)
  const wallet = useWalletAddress()

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
    const campaigns = await window.luckyWheel.account.campaign.all()
    for (let campaign of campaigns) {
      if (campaign.account.authority.toBase58() === wallet)
        return setOwnLottery(campaign.publicKey.toBase58())
    }
  }, [wallet])
  useEffect(() => {
    fetchOwnLottery()
  }, [fetchOwnLottery])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col style={{ maxWidth: 1000 }}>
        {!ownCampaign ? (
          <Button
            onClick={onInitializeCampaign}
            type="primary"
            loading={loading}
            size="large"
          >
            Create Campaign
          </Button>
        ) : (
          <CampaignManagement campaign={ownCampaign} />
        )}
      </Col>
    </Row>
  )
}

export default CreateCampaign
