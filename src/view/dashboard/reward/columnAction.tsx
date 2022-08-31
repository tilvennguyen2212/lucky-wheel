import { Button, Typography } from 'antd'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'
import { useClaim } from 'hooks/actions/useClaim'

type ColumnActionProps = {
  ticketAddress: string
}

const ColumnAction = ({ ticketAddress }: ColumnActionProps) => {
  const tickets = useTicketByCampaign(SENTRE_CAMPAIGN)
  const { state } = tickets[ticketAddress]
  const { onClaim, loading } = useClaim()

  if (state.claimed)
    return <Typography.Title level={5}>CLAIMED</Typography.Title>

  return (
    <Button
      loading={loading}
      type="primary"
      onClick={() => onClaim(ticketAddress)}
    >
      CLAIM
    </Button>
  )
}

export default ColumnAction
