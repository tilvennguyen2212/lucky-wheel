import { CSSProperties, ReactNode } from 'react'

import { RewardAvatar } from 'components/reward/rewardAvatar'
import { Space, Typography } from 'antd'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardName } from 'components/reward/rewardName'

const MARGIN_RATIO = 0.4

type CardRewardAvartarProps = {
  rewardAddress?: string
  size?: number
  style?: CSSProperties
  children?: ReactNode
}
const CardRewardAvartar = ({
  rewardAddress = '',
  size = 64,
  style,
  children,
}: CardRewardAvartarProps) => {
  return (
    <div
      className="card-reward"
      style={{ width: size + 8, height: size + 8, ...style }}
    >
      <div className="card-reward-child" style={{ width: size, height: size }}>
        {children ? (
          children
        ) : (
          <RewardAvatar rewardAddress={rewardAddress} size={size} isChallenge />
        )}
      </div>
      <div className="card-reward-balloons">
        <div className="card-reward-glossy" />
      </div>
    </div>
  )
}

type CardRewardProps = {
  rewardAddresses: string[]
  size?: number
  max?: number
}
const CardReward = ({
  rewardAddresses,
  size = 64,
  max = 2,
}: CardRewardProps) => {
  const filteredAddresses = [...rewardAddresses].splice(0, max)
  const remaining = rewardAddresses.length - max

  return (
    <Space className="card-avatar-reward" direction="vertical" align="center">
      <Space
        style={{ minHeight: 64, justifyContent: 'end' }}
        direction="vertical"
        align="center"
      >
        {filteredAddresses.map((rewardAddress, idx) => (
          <Typography.Title level={4} key={rewardAddress}>
            {idx > 0 && '+ '}
            <RewardAmount rewardAddress={rewardAddress} isChallenge />{' '}
            <RewardName rewardAddress={rewardAddress} isChallenge />
          </Typography.Title>
        ))}
      </Space>
      <div className="group-reward-avatar">
        {filteredAddresses.map((rewardAddress, idx) => {
          const marginLeft = !!idx ? -(size * MARGIN_RATIO) : 0
          return (
            <CardRewardAvartar
              rewardAddress={rewardAddress}
              style={{ zIndex: 99 - idx, marginLeft }}
              size={size}
              key={idx}
            />
          )
        })}
        {remaining > 0 && (
          <CardRewardAvartar
            style={{ zIndex: 1, marginLeft: -(size * MARGIN_RATIO) }}
            size={size}
          >
            <Typography.Title level={3}>+{remaining}</Typography.Title>
          </CardRewardAvartar>
        )}
      </div>
    </Space>
  )
}

export default CardReward
