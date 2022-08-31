import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { TicketState } from 'model/tickets.controller'

export const useTicketByCampaign = (campaignAddress: string, owner = true) => {
  const tickets = useSelector((state: AppState) => state.tickets)
  const walletAddress = useWalletAddress()

  const ticketsByOwner = useMemo(() => {
    const bulk: TicketState = {}
    for (const address in tickets) {
      const { authority, campaign } = tickets[address]
      if (campaign.toBase58() !== campaignAddress) continue
      if (authority.toBase58() !== walletAddress && owner) continue
      bulk[address] = tickets[address]
    }
    return bulk
  }, [campaignAddress, owner, tickets, walletAddress])
  return ticketsByOwner
}
