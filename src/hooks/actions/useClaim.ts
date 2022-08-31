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
      const state = rewards[rewardAddress].rewardType

      try {
        setLoading(true)
        const tx = new web3.Transaction()

        const { tx: txClaim } = await window.luckyWheel.claim({
          ticket: new web3.PublicKey(ticketAddress),
          sendAndConfirm: false,
        })
        tx.add(txClaim)

        if (!state.ticket) {
          const txId = await window.luckyWheel.provider.sendAndConfirm(tx)
          return notifySuccess('Claimed', txId)
        }

        const { tx: txRedeem } = await window.luckyWheel.redeemTicket({
          campaign: new web3.PublicKey(SENTRE_CAMPAIGN),
          sendAndConfirm: false,
        })
        tx.add(txRedeem)

        const txId = await window.luckyWheel.provider.sendAndConfirm(tx)
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
