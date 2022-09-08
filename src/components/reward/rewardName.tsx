import { web3 } from '@project-serum/anchor'
import { MintName, MintSymbol } from '@sen-use/app'

import { EMPTY_ADDRESS } from 'constant'
import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'
import { useReward } from 'hooks/reward/useReward'

export const RewardName = ({
  rewardAddress,
  isChallenge = false,
}: {
  rewardAddress: string
  isChallenge?: boolean
}) => {
  const reward = useReward(rewardAddress) || {
    mint: new web3.PublicKey(EMPTY_ADDRESS),
  }
  const challengeReward = useChallengeRewardData(rewardAddress)
  const data = isChallenge ? challengeReward : reward

  if (!data?.rewardType || rewardAddress === EMPTY_ADDRESS)
    return (
      <span>
        So <br /> Close!
      </span>
    )

  if (data.rewardType.ticket) return <span>Ticket</span>

  if (data.rewardType.nftCollection) return <MintName mintAddress={data.mint} />

  return <MintSymbol mintAddress={data.mint} />
}
