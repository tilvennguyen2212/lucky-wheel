import ListRewards from './listRewards'
import CreateTicketReward from '../createReward/createTicketReward'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'

const TicketRewards = () => {
  const campaignId = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(campaignId)

  const ticketRewards = Object.keys(challengeRewards)
    .filter((addr) => !!challengeRewards[addr].rewardType.ticket)
    .map((address) => {
      return { address, ...challengeRewards[address] }
    })
  return (
    <ListRewards
      data={ticketRewards}
      title="Ticket Rewards"
      actionCreate={<CreateTicketReward campaignAddress={campaignId} />}
    />
  )
}

export default TicketRewards
