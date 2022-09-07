import { MintAvatar } from '@sen-use/app'
import { Avatar } from 'antd'

import { EMPTY_ADDRESS } from 'constant'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'
import { useReward } from 'hooks/reward/useReward'

import GoodLuck from 'static/images/good-luck-icon.png'
import Ticket from 'static/images/ticket-icon.png'

export const RewardAvatar = ({
  rewardAddress,
  size,
  isChallenge = false,
}: {
  rewardAddress: string
  size: number
  isChallenge?: boolean
}) => {
  const reward = useReward(rewardAddress)
  const challengeReward = useChallengeRewardData(rewardAddress)
  const data = isChallenge ? challengeReward : reward

  // Good luck
  if (!data?.rewardType || rewardAddress === EMPTY_ADDRESS)
    return <Avatar size={size} shape="circle" src={GoodLuck} />

  // Ticket
  if (data.rewardType.ticket)
    return <Avatar size={size} src={Ticket} shape="square" />

  // Mint
  return <MintAvatar mintAddress={data.mint} size={size} />
}
