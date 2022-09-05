import { web3 } from '@project-serum/anchor'
import { MintSymbol } from '@sen-use/app'
import { useNftMetaData } from '@sen-use/components'

import { EMPTY_ADDRESS } from 'constant'
import { useReward } from 'hooks/reward/useReward'

export const RewardName = ({ rewardAddress }: { rewardAddress: string }) => {
  const reward = useReward(rewardAddress) || {
    mint: new web3.PublicKey(EMPTY_ADDRESS),
  }
  const { nftInfo, metadata } = useNftMetaData(reward.mint.toBase58())

  if (!reward?.rewardType || rewardAddress === EMPTY_ADDRESS)
    return (
      <span>
        Good <br /> luck
      </span>
    )

  if (reward.rewardType.ticket) return <span>Ticket</span>

  if (reward.rewardType.nftCollection)
    return <span>{metadata?.data.data.name || nftInfo?.name}</span>

  return <MintSymbol mintAddress={reward.mint} />
}
