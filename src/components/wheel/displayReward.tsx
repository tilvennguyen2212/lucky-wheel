import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'
import { MintAmount, MintAvatar, MintSymbol } from '@sen-use/app'

import { Avatar, Space, Typography } from 'antd'

import { Reward, SENTRE_CAMPAIGN } from 'constant'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { Material } from './index'

import GoodLuck from 'static/images/good-luck-icon.png'

const Container = ({ children }: { children: JSX.Element[] }) => (
  <Space
    style={{ zIndex: 3, position: 'relative' }}
    direction="vertical"
    size={0}
  >
    {children}
  </Space>
)

type TokenDisplayProps = {
  mintAddress: string
  amount: BN
}
const TokenDisplay = ({ mintAddress, amount }: TokenDisplayProps) => (
  <Container>
    <MintAvatar mintAddress={mintAddress} size={64} />
    <Typography.Title level={4} style={{ color: '#212433' }}>
      <MintAmount mintAddress={mintAddress} amount={amount} />
    </Typography.Title>
    <Typography.Title level={4} style={{ color: '#212433' }}>
      <MintSymbol mintAddress={mintAddress} />
    </Typography.Title>
  </Container>
)

type DisplayRewardProps = {
  material: Material
}
const DisplayReward = ({ material }: DisplayRewardProps) => {
  const { type, rewardAddress } = material
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  // const { mint, prizeAmount } = rewards[rewardAddress]

  const { mintAddress, prizeAmount } = useMemo(() => {
    if (type === Reward.GoodLuck || type === Reward.Ticket)
      return { mintAddress: '', prizeAmount: new BN(0) }

    const { mint, prizeAmount } = rewards[rewardAddress]
    return { mintAddress: mint.toBase58(), prizeAmount }
  }, [rewardAddress, rewards, type])

  if (type === Reward.Token)
    return <TokenDisplay mintAddress={mintAddress} amount={prizeAmount} />

  return (
    <Container>
      <Avatar size={64} shape="circle" src={GoodLuck} />
      <Typography.Title level={4} style={{ color: '#212433' }}>
        Good <br /> luck
      </Typography.Title>
    </Container>
  )
}

export default DisplayReward
