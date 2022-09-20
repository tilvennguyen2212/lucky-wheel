import { useCallback, useState } from 'react'

import { web3 } from '@project-serum/anchor'
import { notifyError } from 'helper'

const SIZE_TRANSACTION = 7 // Limit instructions per transaction

export const useCloseTickets = () => {
  const [loading, setLoading] = useState(false)
  const closeTickets = useCallback(async (tickets: string[]) => {
    try {
      setLoading(true)
      const transactions: web3.Transaction[] = []
      let size = SIZE_TRANSACTION

      for (let i = 0; i < tickets.length; i += size) {
        const tx = new web3.Transaction()
        if (i + size > tickets.length || size > tickets.length)
          size = tickets.length - i

        tickets.slice(i, i + size).forEach(async (ticketAddress) => {
          const { tx: txClose } = await window.luckyWheel.closeTicket({
            ticket: new web3.PublicKey(ticketAddress),
            sendAndConfirm: false,
          })
          tx.add(txClose)
        })

        transactions.push(tx)
      }
      await window.luckyWheel.provider.sendAll(
        transactions.map((tx) => ({ tx })),
      )
      return window.notify({
        type: 'success',
        description: 'Claimed reward successfully!',
      })
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { closeTickets, loading }
}
