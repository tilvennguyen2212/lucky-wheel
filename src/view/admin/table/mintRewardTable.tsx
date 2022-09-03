import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'
import { RewardType, REWARD_TYPE } from '@sentre/lucky-wheel-core'

import IonIcon from '@sentre/antd-ionicon'
import { MintAmount, MintAvatar } from '@sen-use/app'
import RewardTable from './rewardTable'
import {
  Button,
  Col,
  Row,
  Typography,
  Collapse,
  InputNumber,
  Popover,
  Space,
} from 'antd'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useUpdateRatio } from 'hooks/admin/useUpdateRatio'
import { useDepositReward } from 'hooks/admin/useDepositReward'
import { AppState } from 'model'

const { Panel } = Collapse

type ColumnActionProps = {
  campaign: string
  rewardAddress: string
  mintReward: string
}

const columns = [
  {
    title: 'Mint Avatar',
    dataIndex: 'mint',
    key: 'mint',
    render: (mint: string) => <MintAvatar mintAddress={mint} />,
  },
  {
    title: 'Prize Amount',
    dataIndex: 'prizeAmount',
    key: 'prizeAmount',
    render: (prizeAmount: BN, data: any) => {
      return !data.rewardType.token ? (
        <Typography.Text>{prizeAmount.toString()}</Typography.Text>
      ) : (
        <MintAmount mintAddress={data.mint} amount={prizeAmount} />
      )
    },
  },
  {
    title: 'Reserve Prize',
    dataIndex: 'reservePrize',
    key: 'reservePrize',
    render: (reservePrize: BN) => (
      <Typography>{reservePrize.toNumber()}</Typography>
    ),
  },

  {
    title: 'Ratio',
    dataIndex: 'toLuckyNumber',
    key: 'toLuckyNumber',
    render: (ratio: BN) => (
      <Typography.Text>
        {(Number(ratio.toString()) / 10 ** 18) * 100}%
      </Typography.Text>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'campaign',
    key: 'campaign',
    render: (campaign: string, data: any) => (
      <ColumnAction
        campaign={campaign}
        rewardAddress={data.rewardAddress}
        mintReward={data.mint}
      />
    ),
  },
]

const ColumnAction = ({
  campaign,
  rewardAddress,
  mintReward,
}: ColumnActionProps) => {
  const [visible, setVisible] = useState(false)
  const [ratio, setRatio] = useState(0)
  const [totalPrize, setTotalPrize] = useState(0)
  const { onUpdateRatio, loading: ratioLoading } = useUpdateRatio()
  const { onDepositReward, loading: depositLoading } = useDepositReward()

  return (
    <Row>
      <Col>
        <Popover
          content={
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Update Ratio" key="1">
                <Space size={4}>
                  <Typography.Text>New Ratio: </Typography.Text>
                  <InputNumber value={ratio} onChange={setRatio} />
                  <Button
                    onClick={() =>
                      onUpdateRatio({ campaign, rewardAddress, ratio })
                    }
                    loading={ratioLoading}
                  >
                    Update
                  </Button>
                </Space>
              </Panel>
              <Panel header="Deposit" key="2">
                <Space size={4}>
                  <Typography.Text>Total Prize: </Typography.Text>
                  <InputNumber value={totalPrize} onChange={setTotalPrize} />
                  <Button
                    onClick={() =>
                      onDepositReward({
                        campaign,
                        reward: rewardAddress,
                        mint: mintReward,
                        totalPrize,
                      })
                    }
                    loading={depositLoading}
                  >
                    Deposit
                  </Button>
                </Space>
              </Panel>
            </Collapse>
          }
          trigger="click"
          visible={visible}
          onVisibleChange={setVisible}
          placement="right"
        >
          <Button onClick={() => setVisible(!visible)}>
            <IonIcon name="create-outline" />
          </Button>
        </Popover>
      </Col>
    </Row>
  )
}

type MintRewardTableProps = {
  rewardType: RewardType
}

const MintRewardTable = ({ rewardType }: MintRewardTableProps) => {
  const campaign = useSelector((state: AppState) => state.main.campaign)
  const rewards = useRewardByCampaign(campaign)

  const data = useMemo(() => {
    return Object.keys(rewards)
      .filter((address) => {
        const { rewardType: rewardTypeCampaign, campaign: rewardCampaign } =
          rewards[address]
        const mintType =
          rewardType === REWARD_TYPE.token
            ? rewardTypeCampaign.token
            : rewardTypeCampaign.nft
        return rewardCampaign.toBase58() === campaign && !!mintType
      })
      .map((address) => {
        return { ...rewards[address], rewardAddress: address }
      })
  }, [campaign, rewardType, rewards])
  return (
    <RewardTable
      title={rewardType.token ? 'Mint Rewards' : 'NFT Rewards'}
      columns={columns}
      data={data}
    />
  )
}

export default MintRewardTable
