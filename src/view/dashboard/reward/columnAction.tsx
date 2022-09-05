import { Button, Typography } from 'antd'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useClaim } from 'hooks/actions/useClaim'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

type ColumnActionProps = {
  ticketAddress: string
}

const ColumnAction = ({ ticketAddress }: ColumnActionProps) => {
  const selectedCampaign = useSelectedCampaign()
  const tickets = useTicketByCampaign(selectedCampaign)
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
