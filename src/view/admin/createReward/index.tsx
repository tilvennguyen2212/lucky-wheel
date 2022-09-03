import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { MintSelection } from '@sen-use/app'
import {
  Button,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import NftCollection from '../nftCollection'

import { RewardType } from 'constant'

import { useInitializeTokenReward } from 'hooks/admin/useInitalizeTokenReward'
import { useInitializeTicket } from 'hooks/admin/useInitializeTicket'
import { useInitializeNFTReward } from 'hooks/admin/useInitializeNFTReward'
import { AppState } from 'model'

const { Option } = Select

const CreateReward = () => {
  const campaign = useSelector((state: AppState) => state.main.campaign)
  const [type, setType] = useState(RewardType.Token)
  const [selectedMint, setSelectedMint] = useState('')
  const [nftCollection, setNftCollection] = useState('')
  const [totalPrize, setTotalPrize] = useState('')
  const [prizeAmount, setPrizeAmount] = useState('')
  const [reservePrize, setReservePrize] = useState('')
  const [ratio, setRatio] = useState(0)
  const { onInitializeTokenReward } = useInitializeTokenReward()
  const { onInitializeNFTReward } = useInitializeNFTReward()
  const { onInitializeTicket } = useInitializeTicket()

  const onCreateReward = async () => {
    switch (type) {
      case RewardType.Ticket:
        await onInitializeTicket(campaign)
        break
      case RewardType.NFT:
        await onInitializeNFTReward({ mint: nftCollection, campaign, ratio })
        break
      default:
        await onInitializeTokenReward({
          mint: selectedMint,
          prizeAmount,
          campaign,
          totalPrize,
          ratio,
        })
        break
    }
  }

  return (
    <Row justify="center" gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Space align="center" style={{ width: '100%' }} direction="vertical">
          <Typography.Title level={1}>Create Reward</Typography.Title>
        </Space>
      </Col>
      <Col xs={24} lg={16}>
        <Row gutter={[24, 24]} justify="space-between" wrap={false}>
          <Col>
            <Space direction="vertical">
              <Typography.Text>Select type</Typography.Text>
              <Select onChange={setType} style={{ width: '100%' }} value={type}>
                <Option value={RewardType.Token}>{RewardType.Token}</Option>
                <Option value={RewardType.NFT}>{RewardType.NFT}</Option>
                <Option value={RewardType.Ticket}>{RewardType.Ticket}</Option>
              </Select>
            </Space>
          </Col>
          {type === RewardType.Token && (
            <Fragment>
              <Col>
                <Space direction="vertical">
                  <Typography.Text>Select Mint</Typography.Text>
                  <MintSelection
                    onChange={setSelectedMint}
                    value={selectedMint}
                  />
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text>Total Prize</Typography.Text>
                  <Input
                    value={totalPrize}
                    onChange={(e) => setTotalPrize(e.target.value)}
                  />
                </Space>
              </Col>
            </Fragment>
          )}
          {type === RewardType.NFT && (
            <Col>
              <Space direction="vertical">
                <Typography.Text>Select Collection</Typography.Text>
                <NftCollection setCollection={setNftCollection} />
                <Typography.Text>
                  {util.shortenAddress(nftCollection)}
                </Typography.Text>
              </Space>
            </Col>
          )}
          <Col>
            <Space direction="vertical">
              <Typography.Text>Prize Amount</Typography.Text>
              <Input
                value={prizeAmount}
                onChange={(e) => setPrizeAmount(e.target.value)}
              />
            </Space>
          </Col>
          {type === RewardType.NFT && (
            <Col>
              <Space direction="vertical">
                <Typography.Text>Reserve Prize</Typography.Text>
                <Input
                  value={reservePrize}
                  onChange={(e) => setReservePrize(e.target.value)}
                />
              </Space>
            </Col>
          )}
          <Col>
            <Space direction="vertical">
              <Typography.Text>Ratio(%)</Typography.Text>
              <InputNumber value={ratio} onChange={setRatio} />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={16}>
        <Button block onClick={onCreateReward} type="primary">
          Create {type} Reward
        </Button>
      </Col>
    </Row>
  )
}

export default CreateReward
