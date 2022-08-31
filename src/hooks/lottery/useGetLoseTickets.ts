import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'
import { getMultipleAccounts } from '@sen-use/web3'

import { AppState } from 'model'
import { TicketState } from 'model/tickets.controller'

export type PickerData = {
  ticket: web3.PublicKey
  recoveryId: number
  signature: number[]
}

export const useGetLoseTickets = (campaignAddress: string) => {
  const tickets = useSelector((state: AppState) => state.tickets)
  const walletAddress = useWalletAddress()

  const getLoseTickets = useCallback(async () => {
    const ticketPks = Object.keys(tickets).map(
      (ticket) => new web3.PublicKey(ticket),
    )
    const ticketAccounts = await getMultipleAccounts(
      window.luckyWheel.provider.connection,
      ticketPks,
    )

    const bulk: TicketState = {}
    for (const account of ticketAccounts) {
      if (!account) continue
      const ticketAddr = account.publicKey.toBase58()
      const ticketData = tickets[ticketAddr]
      const { authority, campaign } = ticketData
      if (
        authority.toBase58() !== walletAddress ||
        campaign.toBase58() !== campaignAddress ||
        !ticketData.state.lost
      )
        continue
      bulk[ticketAddr] = ticketData
    }
    return bulk
  }, [campaignAddress, tickets, walletAddress])

  return getLoseTickets
}
