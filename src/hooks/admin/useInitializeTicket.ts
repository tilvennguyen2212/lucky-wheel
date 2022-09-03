import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

export const useInitializeTicket = () => {
  const [loading, setLoading] = useState(false)

  const onInitializeTicket = useCallback(async (campaign: string) => {
    setLoading(true)
    try {
      const { txId } = await window.luckyWheel.initializeTicket({
        campaign: new web3.PublicKey(campaign),
      })
      notifySuccess('Create Ticket', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])
  return { onInitializeTicket, loading }
}
