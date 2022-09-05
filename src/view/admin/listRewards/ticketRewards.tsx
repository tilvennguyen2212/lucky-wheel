import ListRewards from './listRewards'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import CreateTicketReward from '../createReward/createTicketReward'

const TicketRewards = () => {
  const campaignId = useSelectedCampaign()
  const rewards = useRewardByCampaign(campaignId)

  const ticketRewards = Object.keys(rewards)
    .filter((addr) => !!rewards[addr].rewardType.ticket)
    .map((address) => {
      return { address, ...rewards[address] }
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
