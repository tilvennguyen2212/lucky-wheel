import { useState } from 'react'

import NotifyGoodLuck from './goodLuck'
import Congrats from './congrats'

import { useTicket } from 'hooks/ticket/useTicket'
type NotifyResultProps = {
  ticket: string
  onSpinning: (amount: number, isMul: boolean) => void
}

const NotifyResult = ({ ticket, onSpinning }: NotifyResultProps) => {
  const [visible, setVisible] = useState(true)
  const ticketData = useTicket(ticket)

  if (!ticketData.state.won)
    return (
      <NotifyGoodLuck
        visible={visible}
        onSpinning={onSpinning}
        onClose={() => setVisible(false)}
      />
    )

  return (
    <Congrats
      ticket={ticket}
      visible={visible}
      onClose={() => setVisible(false)}
      onSpinning={onSpinning}
    />
  )
}

export default NotifyResult
