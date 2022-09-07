import ListRewards from './listRewards'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import CreateTicketReward from '../createReward/createTicketReward'

const TicketRewards = () => {
  const campaignId = useSelectedCampaign()

  return (
    <ListRewards
      data={[]}
      title="Ticket Rewards"
      actionCreate={<CreateTicketReward campaignAddress={campaignId} />}
    />
  )
}

export default TicketRewards
