import ListRewards from './listRewards'
import CreateTokenReward from '../createReward/createTokenReward'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'

const TokenRewards = () => {
  const campaignId = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(campaignId)

  const tokenRewards = Object.keys(challengeRewards)
    .filter((addr) => !!challengeRewards[addr].rewardType.token)
    .map((address) => {
      return { address, ...challengeRewards[address] }
    })

  return (
    <ListRewards
      data={tokenRewards}
      title="Token Rewards"
      actionCreate={<CreateTokenReward campaignAddress={campaignId} />}
    />
  )
}

export default TokenRewards
