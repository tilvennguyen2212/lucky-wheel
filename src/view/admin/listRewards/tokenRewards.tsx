import ListRewards from './listRewards'
import CreateTokenReward from '../createReward/createTokenReward'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

const TokenRewards = () => {
  const campaignId = useSelectedCampaign()
  const rewards = useRewardByCampaign(campaignId)

  const tokenRewards = Object.keys(rewards)
    .filter((addr) => !!rewards[addr].rewardType.token)
    .map((address) => {
      return { address, ...rewards[address] }
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
