import { useCallback, useEffect, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { useAccounts } from '@sentre/senhub'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

export const useTotalUnclaimedTicket = () => {
  const [totalTicket, setTotalTicket] = useState(0)
  const [ticketMintAddr, setTicketMintAddr] = useState('')

  const accounts = useAccounts()
  const campaign = useSelectedCampaign()

  const fetchTicketMint = useCallback(async () => {
    try {
      const { ticketMint } = await window.luckyWheel.deriveCampaignPDAs(
        new web3.PublicKey(campaign),
      )
      const ticketMintAddress = ticketMint.toBase58()
      setTicketMintAddr(ticketMintAddress)

      for (const address in accounts) {
        const { mint, amount } = accounts[address]
        if (mint === ticketMintAddress) return setTotalTicket(Number(amount))
      }
    } catch (error) {}
  }, [accounts, campaign])

  useEffect(() => {
    fetchTicketMint()
  }, [fetchTicketMint])

  return { totalTicket, ticketMintAddr }
}
