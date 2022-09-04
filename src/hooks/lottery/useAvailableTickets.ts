import { useMemo } from 'react'
import { web3 } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { TicketState } from 'model/tickets.controller'

export type PickerData = {
  ticket: web3.PublicKey
  recoveryId: number
  signature: number[]
}

export const useAvailableTickets = (campaignAddress: string) => {
  const tickets = useSelector((state: AppState) => state.tickets)
  const walletAddress = useWalletAddress()

  const filteredTicket = useMemo(() => {
    const bulk: TicketState = {}
    for (const address in tickets) {
      const ticketData = tickets[address]
      console.log('ticketData', ticketData.reward.toBase58())
      const { authority, campaign } = ticketData
      if (
        authority.toBase58() !== walletAddress ||
        campaign.toBase58() !== campaignAddress ||
        !ticketData.state.initialized
      )
        continue
      bulk[address] = ticketData
    }
    return bulk
  }, [campaignAddress, tickets, walletAddress])

  return filteredTicket
}
