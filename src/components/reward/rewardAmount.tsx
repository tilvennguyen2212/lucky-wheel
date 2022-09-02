import { MintAmount } from '@sen-use/app'

import { EMPTY_ADDRESS } from 'constant'
import { useReward } from 'hooks/reward/useReward'

export const RewardAmount = ({ rewardAddress }: { rewardAddress: string }) => {
  const reward = useReward(rewardAddress)

  if (
    !reward?.rewardType ||
    rewardAddress === EMPTY_ADDRESS ||
    reward.rewardType.nft
  )
    return null

  if (reward.rewardType.ticket)
    return <span>+{reward.prizeAmount.toNumber()}</span>

  return <MintAmount mintAddress={reward.mint} amount={reward.prizeAmount} />
}
