import { NFTSelection } from '@sen-use/components'

import { useDepositReward } from 'hooks/admin/useDepositReward'
import { useReward } from 'hooks/reward/useReward'

const DepositNft = ({ rewardAddress }: { rewardAddress: string }) => {
  const { onDepositReward } = useDepositReward()
  const rewardData = useReward(rewardAddress)

  const onDeposit = async (mint: string) => {
    await onDepositReward({
      campaign: rewardData.campaign.toBase58(),
      reward: rewardAddress,
      mint,
      totalPrize: 1,
    })
  }

  return (
    <NFTSelection
      collectionAddress={[rewardData.mint.toBase58()]}
      onSelect={onDeposit}
    />
  )
}

export default DepositNft
