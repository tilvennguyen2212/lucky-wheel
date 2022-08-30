import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'

export const useTicketByOwner = (campaignAddress: string) => {
  const tickets = useSelector((state: AppState) => state.tickets)
  const walletAddress = useWalletAddress()

  const ticketsByOwner = useMemo(
    () =>
      Object.values(tickets).filter(
        ({ authority, campaign }) =>
          authority.toBase58() === walletAddress &&
          campaignAddress === campaign.toBase58(),
      ),
    [campaignAddress, tickets, walletAddress],
  )
  return ticketsByOwner
}
