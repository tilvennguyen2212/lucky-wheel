import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import { initTickets, upsetTicket } from 'model/tickets.controller'

// TODO: Config
const NAME = 'ticket'
const FILTER: web3.GetProgramAccountsFilter[] = []

const TicketsWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initTickets(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetTicket({ address: key, data: value })),
    [dispatch],
  )

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
