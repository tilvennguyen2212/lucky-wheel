import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { TicketState } from 'model/tickets.controller'

export const useTicketByOwner = (campaignAddress: string) => {
  const tickets = useSelector((state: AppState) => state.tickets)
  const walletAddress = useWalletAddress()

  const ticketsByOwner = useMemo(() => {
    const bulk: TicketState = {}
    for (const address in tickets) {
      const { authority, campaign } = tickets[address]
      if (
        authority.toBase58() !== walletAddress ||
        campaign.toBase58() !== campaignAddress
      )
        continue
      bulk[address] = tickets[address]
    }
    return bulk
  }, [campaignAddress, tickets, walletAddress])
  return ticketsByOwner
}
