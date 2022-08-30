import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'
import { MintAmount } from '@sen-use/app/dist'

const ColumnAmount = ({ rewardAddress }: { rewardAddress: string }) => {
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const { mint, prizeAmount } = rewards[rewardAddress]
  return <MintAmount mintAddress={mint.toBase58()} amount={prizeAmount} />
}

export default ColumnAmount
