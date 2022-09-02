import { MintSymbol } from '@sen-use/app'

import { EMPTY_ADDRESS } from 'constant'
import { useReward } from 'hooks/reward/useReward'

export const RewardName = ({ rewardAddress }: { rewardAddress: string }) => {
  const reward = useReward(rewardAddress)

  if (!reward?.rewardType || rewardAddress === EMPTY_ADDRESS)
    return (
      <span>
        Good <br /> luck
      </span>
    )

  if (reward.rewardType.ticket) return <span>Ticket</span>

  return <MintSymbol mintAddress={reward.mint} />
}
