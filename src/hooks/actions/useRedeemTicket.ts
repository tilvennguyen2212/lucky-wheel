import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

const SIZE_TRANSACTION = 7 // Limit instructions per transaction

export const useRedeemTicket = () => {
  const selectedCampaign = useSelectedCampaign()

  const redeemTicket = useCallback(
    async (totalTicket: number) => {
      if (!totalTicket) return []
      let size = SIZE_TRANSACTION
      let txs: {
        tx: web3.Transaction
        signers: web3.Keypair[]
      }[] = []
      for (let i = 0; i < totalTicket; i += size) {
        const tx = new web3.Transaction()
        const signers: web3.Keypair[] = []

        if (i + size > totalTicket || size > totalTicket) size = totalTicket - i

        for (let i = 0; i < size; i++) {
          const ticket = web3.Keypair.generate()
          const { tx: txRedeem } = await window.luckyWheel.redeemTicket({
            campaign: new web3.PublicKey(selectedCampaign),
            ticket,
            sendAndConfirm: false,
          })
          tx.add(txRedeem)
          signers.push(ticket)
        }
        txs.push({ tx, signers })
      }

      return txs
    },
    [selectedCampaign],
  )

  return redeemTicket
}
