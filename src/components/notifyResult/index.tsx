import NotifyGoodLuck from './goodLuck'
import Congrats from './congrats'

import { useTicket } from 'hooks/ticket/useTicket'
import { useState } from 'react'

type NotifyResultProps = {
  ticket: string
}

const NotifyResult = ({ ticket }: NotifyResultProps) => {
  const [visible, setVisible] = useState(true)
  const ticketData = useTicket(ticket)

  if (!ticketData.state.won)
    <NotifyGoodLuck visible={visible} onClose={() => setVisible(false)} />

  return (
    <Congrats
      ticket={ticket}
      visible={visible}
      onClose={() => setVisible(false)}
    />
  )
}

export default NotifyResult
