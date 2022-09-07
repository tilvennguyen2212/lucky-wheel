import { MintAmount } from '@sen-use/app'

import { EMPTY_ADDRESS } from 'constant'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'
import { useReward } from 'hooks/reward/useReward'

type RewardAmountProps = {
  rewardAddress: string
  isChallenge?: boolean
}

export const RewardAmount = ({
  rewardAddress,
  isChallenge = false,
}: RewardAmountProps) => {
  const challengeReward = useChallengeRewardData(rewardAddress)
  const reward = useReward(rewardAddress)

  const data = isChallenge ? challengeReward : reward
  const amount = isChallenge ? challengeReward?.amount : reward?.prizeAmount

  if (!data?.rewardType || rewardAddress === EMPTY_ADDRESS) return null

  if (data.rewardType.nftCollection) return <span>1</span>

  if (data.rewardType.ticket) return <span>{amount.toNumber()}</span>

  return <MintAmount mintAddress={data.mint} amount={amount} />
}
