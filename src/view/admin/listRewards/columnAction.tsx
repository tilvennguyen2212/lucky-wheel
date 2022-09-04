import { useState } from 'react'

import { Button, Collapse, InputNumber, Popover, Typography, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useDepositReward } from 'hooks/admin/useDepositReward'
import { useUpdateRatio } from 'hooks/admin/useUpdateRatio'
import { useReward } from 'hooks/reward/useReward'
import { AvatarNFT, NFTSelection } from '@sen-use/components/dist'

const ColumnAction = ({ rewardAddress }: { rewardAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [ratio, setRatio] = useState(0)
  const [totalPrize, setTotalPrize] = useState(0)
  const reward = useReward(rewardAddress)
  const { onUpdateRatio, loading: ratioLoading } = useUpdateRatio()
  const { onDepositReward, loading: depositLoading } = useDepositReward()
  const [mintAddress, setMintAddress] = useState(reward.mint.toBase58())
  return (
    <Popover
      content={
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Update Ratio" key="1">
            <Space size={4}>
              <Typography.Text>New Ratio: </Typography.Text>
              <InputNumber value={ratio} onChange={setRatio} />
              <Button
                onClick={() =>
                  onUpdateRatio({
                    campaign: reward.campaign.toBase58(),
                    rewardAddress,
                    ratio,
                  })
                }
                loading={ratioLoading}
              >
                Update
              </Button>
            </Space>
          </Collapse.Panel>
          <Collapse.Panel header="Deposit" key="2">
            <Space>
              {reward.rewardType.nft ? (
                <Space>
                  <NFTSelection
                    collectionAddress={[reward.mint.toBase58()]}
                    onSelect={setMintAddress}
                  />
                  <AvatarNFT
                    mintAddress={
                      mintAddress === reward.mint.toBase58() ? '' : mintAddress
                    }
                    size={24}
                  />
                </Space>
              ) : (
                <Space>
                  <Typography.Text>Total Prize: </Typography.Text>
                  <InputNumber value={totalPrize} onChange={setTotalPrize} />
                </Space>
              )}

              <Button
                onClick={() =>
                  onDepositReward({
                    campaign: reward.campaign.toBase58(),
                    reward: rewardAddress,
                    mint: mintAddress,
                    totalPrize,
                  })
                }
                loading={depositLoading}
              >
                Deposit
              </Button>
            </Space>
          </Collapse.Panel>
        </Collapse>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomLeft"
    >
      <Button onClick={() => setVisible(!visible)}>
        <IonIcon name="create-outline" />
      </Button>
    </Popover>
  )
}

export default ColumnAction
