import { useCallback, useMemo } from 'react'
import { TicketState } from 'model/tickets.controller'

const useAllTicketsByCompagin = (campaignAddress: string) => {
  const { accountClient } = useMemo(() => {
    const accountClient = window.luckyWheel.program.account.ticket
    const connection = accountClient.provider.connection

    return { accountClient, connection }
  }, [])

  const getTickets = useCallback(async () => {
    try {
      const ticketsInfo = await accountClient.all([
        { memcmp: { bytes: campaignAddress, offset: 8 } },
      ])
      const bulk: TicketState = {}
      for (const ticket of ticketsInfo) {
        bulk[ticket.publicKey.toBase58()] = ticket.account
      }

      return bulk
    } catch (err) {
      return {}
    }
  }, [accountClient, campaignAddress])

  return { getTickets }
}

export default useAllTicketsByCompagin
