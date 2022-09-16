import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import { initTickets, upsetTicket } from 'model/tickets.controller'
import { useWalletAddress } from '@sentre/senhub'

// TODO: Config
const NAME = 'ticket'

const TicketsWatcher = () => {
  const dispatch = useDispatch()
  const walletAddress = useWalletAddress()

  // TODO: init all account data
  const init = useCallback(
    async (data) => dispatch(initTickets(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetTicket({ address: key, data: value })),
    [dispatch],
  )
  const FILTER = useMemo((): web3.GetProgramAccountsFilter[] => {
    return [{ memcmp: { bytes: walletAddress, offset: 40 } }]
  }, [walletAddress])

  if (!walletAddress) return null
  return (
    <Watcher
      program={window.luckyWheel.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default TicketsWatcher
