import { Button, Typography } from 'antd'

import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'
import { SENTRE_CAMPAIGN } from 'constant'
import { useClaim } from 'hooks/lottery/useClaim'

type ColumnActionProps = {
  ticketAddress: string
}

const ColumnAction = ({ ticketAddress }: ColumnActionProps) => {
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)
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
