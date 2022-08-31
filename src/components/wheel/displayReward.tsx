import { useMemo } from 'react'
import { BN } from '@project-serum/anchor'
import { MintAmount, MintAvatar, MintSymbol } from '@sen-use/app'

import { Avatar, Space, Typography, Image } from 'antd'

import { Reward, SENTRE_CAMPAIGN } from 'constant'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { Material } from './index'

import GoodLuck from 'static/images/good-luck-icon.png'
import Ticket from 'static/images/ticket-icon.png'

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

const TicketDisplay = ({ prizeAmount }: { prizeAmount: BN }) => (
  <Container>
    <Image preview={false} style={{ height: 64, width: 64 }} src={Ticket} />
    <Typography.Title level={4} style={{ color: '#212433' }}>
      +{prizeAmount.toString()} Ticket
    </Typography.Title>
  </Container>
)

type DisplayRewardProps = {
  material: Material
}
const DisplayReward = ({ material }: DisplayRewardProps) => {
  const { type, rewardAddress } = material
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)

  const { mintAddress, prizeAmount } = useMemo(() => {
    if (type === Reward.GoodLuck)
      return { mintAddress: '', prizeAmount: new BN(0) }

    const { mint, prizeAmount } = rewards[rewardAddress]
    return { mintAddress: mint.toBase58(), prizeAmount }
  }, [rewardAddress, rewards, type])

  if (type === Reward.Token)
    return <TokenDisplay mintAddress={mintAddress} amount={prizeAmount} />

  if (type === Reward.Ticket) return <TicketDisplay prizeAmount={prizeAmount} />

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
