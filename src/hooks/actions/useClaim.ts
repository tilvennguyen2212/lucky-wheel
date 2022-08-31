import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { SENTRE_CAMPAIGN } from 'constant'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'

export const useClaim = () => {
  const [loading, setLoading] = useState(false)
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const tickets = useTicketByCampaign(SENTRE_CAMPAIGN)

  const onClaim = useCallback(
    async (ticketAddress: string) => {
      const rewardAddress = tickets[ticketAddress].reward.toBase58()
      const { rewardType, mint, prizeAmount } = rewards[rewardAddress]

      try {
        setLoading(true)
        const tx = new web3.Transaction()
        const signer: web3.Keypair[] = []
        const { tx: txClaim } = await window.luckyWheel.claim({
          ticket: new web3.PublicKey(ticketAddress),
          mint,
          sendAndConfirm: false,
        })
        tx.add(txClaim)

        // Redeem ticket
        if (rewardType.ticket) {
          for (let i = 0; i < prizeAmount.toNumber(); i++) {
            const newTicket = web3.Keypair.generate()
            const { tx: txRedeem } = await window.luckyWheel.redeemTicket({
              campaign: new web3.PublicKey(SENTRE_CAMPAIGN),
              ticket: newTicket,
              sendAndConfirm: false,
            })
            tx.add(txRedeem)
            signer.push(newTicket)
          }
        }
        const txId = await window.luckyWheel.provider.sendAndConfirm(tx, signer)
        return notifySuccess('Claimed', txId)
      } catch (error) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [rewards, tickets],
  )
  return { onClaim, loading }
}
