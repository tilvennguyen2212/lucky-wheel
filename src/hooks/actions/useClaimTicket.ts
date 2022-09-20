import { useCallback, useState } from 'react'

import { useTotalUnclaimedTicket } from 'hooks/ticket/useTotalUnclaimedTicket'
import { notifyError } from 'helper'
import { useRedeemTicket } from './useRedeemTicket'

export const useClaimTicket = () => {
  const [loading, setLoading] = useState(false)
  const { totalTicket } = useTotalUnclaimedTicket()
  const redeemTicket = useRedeemTicket()

  const claimRawTicket = useCallback(async () => {
    try {
      setLoading(true)
      const txs = await redeemTicket(totalTicket)

      await window.luckyWheel.provider.sendAll(
        txs.map(({ tx, signers }) => {
          return { tx, signers }
        }),
        { commitment: 'finalized', preflightCommitment: 'finalized' },
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
  }, [redeemTicket, totalTicket])

  return { loading, claimRawTicket }
}
