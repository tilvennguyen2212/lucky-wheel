import { useCallback, useEffect, useState } from 'react'
import { encodeIxData } from '@sen-use/web3'
import { TicketData } from '@sentre/lucky-wheel-core'

export const useWonTickets = () => {
  const [watchId, setWatchId] = useState(0)
  const [ticket, setTicket] = useState<Record<string, TicketData>>({})

  const watchData = useCallback(async () => {
    if (watchId) return
    const nextTicket = JSON.parse(JSON.stringify(ticket))
    const { provider, program } = window.luckyWheel
    const newWatcherId = provider.connection.onProgramAccountChange(
      program.account.ticket.programId,
      async (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = program.coder.accounts.decode('ticket', buffer)
        nextTicket[address] = accountData
      },
      'confirmed',
      [{ memcmp: { bytes: encodeIxData([3]), offset: 121 } }],
    )
    setWatchId(newWatcherId)
    return setTicket(nextTicket)
  }, [ticket, watchId])

  useEffect(() => {
    if (watchId) return
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await window.luckyWheel.provider.connection.removeProgramAccountChangeListener(
          watchId,
        )
        setWatchId(0)
      })()
    }
  }, [watchData, watchId])

  return { ...ticket }
}
