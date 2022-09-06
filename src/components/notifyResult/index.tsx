import { useEffect, useMemo, useState } from 'react'

import NotifyGoodLuck from './goodLuck'
import Congrats from './congrats'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'

type NotifyResultProps = {
  pickedTickets: string[]
  onSpinning: (amount: number, isMul: boolean) => void
}

const NotifyResult = ({ pickedTickets, onSpinning }: NotifyResultProps) => {
  const [visible, setVisible] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const tickets = useTicketByCampaign(selectedCampaign)

  const wonTickets = useMemo(
    () => pickedTickets.filter((ticket) => tickets[ticket].state.won),
    [pickedTickets, tickets],
  )

  useEffect(() => {
    setVisible(!!pickedTickets.length)
  }, [pickedTickets])

  if (!wonTickets.length)
    return (
      <NotifyGoodLuck
        visible={visible}
        onSpinning={onSpinning}
        onClose={() => setVisible(false)}
      />
    )

  return (
    <Congrats
      pickedTickets={wonTickets}
      visible={visible}
      onClose={() => setVisible(false)}
      onSpinning={onSpinning}
    />
  )
}

export default NotifyResult
