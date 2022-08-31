import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

export const useClaim = () => {
  const [loading, setLoading] = useState(false)
  const onClaim = useCallback(async (ticketAddress: string) => {
    try {
      setLoading(true)
      const { txId } = await window.luckyWheel.claim({
        ticket: new web3.PublicKey(ticketAddress),
        sendAndConfirm: true,
      })
      return notifySuccess('Claimed', txId)
    } catch (error) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])
  return { onClaim, loading }
}
