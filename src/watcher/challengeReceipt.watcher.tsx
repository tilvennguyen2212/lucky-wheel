import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import {
  initChallengeReceipts,
  upsetChallengeReceipt,
} from 'model/challengeReceipts.controller'

// TODO: Config
const NAME = 'challengeRewardReceipt'
const FILTER: web3.GetProgramAccountsFilter[] = []

const ChallengeReceiptWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback(
    (data) => dispatch(initChallengeReceipts(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetChallengeReceipt({ address: key, data: value })),
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
export default ChallengeReceiptWatcher
