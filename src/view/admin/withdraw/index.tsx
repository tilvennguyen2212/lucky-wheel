import { useReward } from 'hooks/reward/useReward'
import WithdrawMint from './withdrawMint'
import WithdrawNft from './withdrawNft'

export const WithdrawReward = ({
  rewardAddress,
}: {
  rewardAddress: string
}) => {
  const rewardData = useReward(rewardAddress)

  if (rewardData.rewardType.nftCollection)
    return <WithdrawNft rewardAddress={rewardAddress} />
  return <WithdrawMint rewardAddress={rewardAddress} />
}
