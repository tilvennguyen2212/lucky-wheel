import { web3 } from '@project-serum/anchor'
import { MintSymbol } from '@sen-use/app'
import { useNftMetaData } from '@sen-use/components'

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

  const { nftInfo, metadata } = useNftMetaData(reward.mint.toBase58())

  if (!data?.rewardType || rewardAddress === EMPTY_ADDRESS)
    return (
      <span>
        So <br /> Close!
      </span>
    )

  if (data.rewardType.ticket) return <span>Ticket</span>

  if (data.rewardType.nftCollection)
    return <span>{metadata?.data.data.name || nftInfo?.name}</span>

  return <MintSymbol mintAddress={data.mint} />
}
