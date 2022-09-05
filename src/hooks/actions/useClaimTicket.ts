import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { useTotalUnclaimedTicket } from 'hooks/ticket/useTotalUnclaimedTicket'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { notifyError } from 'helper'

const SIZE_TRANSACTION = 7 // Limit instructions per transaction

export const useClaimTicket = () => {
  const [loading, setLoading] = useState(false)
  const { totalTicket } = useTotalUnclaimedTicket()
  const selectedCampaign = useSelectedCampaign()

  const redeemTicket = useCallback(async () => {
    if (!totalTicket) return
    let size = SIZE_TRANSACTION

    try {
      setLoading(true)
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

      await window.luckyWheel.provider.sendAll(
        txs.map(({ tx, signers }) => {
          return { tx, signers }
        }),
      )

      return window.notify({
        type: 'success',
        description: `Redeemed tickets successfully.`,
      })
    } catch (error) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [selectedCampaign, totalTicket])

  return { loading, redeemTicket }
}
