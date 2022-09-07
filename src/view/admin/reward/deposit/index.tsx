import { useReward } from 'hooks/reward/useReward'
import DepositMint from './depositMint'
import DepositNft from './depositNft'

const DepositReward = ({ rewardAddress }: { rewardAddress: string }) => {
  const rewardData = useReward(rewardAddress)

  if (rewardData.rewardType.nftCollection)
    return <DepositNft rewardAddress={rewardAddress} />

  return <DepositMint rewardAddress={rewardAddress} />
}

export default DepositReward
