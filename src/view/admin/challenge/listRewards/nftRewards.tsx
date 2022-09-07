import ListRewards from './listRewards'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import CreateNftReward from '../createReward/createNftReward'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'

const NftRewards = () => {
  const campaignId = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(campaignId)

  const nftRewards = Object.keys(challengeRewards)
    .filter((addr) => !!challengeRewards[addr].rewardType.nftCollection)
    .map((address) => {
      return { address, ...challengeRewards[address] }
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
