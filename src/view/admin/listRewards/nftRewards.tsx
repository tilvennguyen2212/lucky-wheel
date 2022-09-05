import ListRewards from './listRewards'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import CreateNftReward from '../createReward/createNftReward'

const NftRewards = () => {
  const campaignId = useSelectedCampaign()
  const rewards = useRewardByCampaign(campaignId)

  const nftRewards = Object.keys(rewards)
    .filter((addr) => !!rewards[addr].rewardType.nftCollection)
    .map((address) => {
      return { address, ...rewards[address] }
    })

  return (
    <ListRewards
      data={nftRewards}
      title="NFT Rewards"
      actionCreate={<CreateNftReward campaignAddress={campaignId} />}
    />
  )
}

export default NftRewards
