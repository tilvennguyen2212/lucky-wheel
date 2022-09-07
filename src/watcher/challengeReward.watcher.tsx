import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'

import {
  initChallengeRewards,
  upsetChallengeReward,
} from 'model/challengeRewards.controller'

// TODO: Config
const NAME = 'challengeReward'
const FILTER: web3.GetProgramAccountsFilter[] = []

const ChallengeRewardWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback(
    (data) => dispatch(initChallengeRewards(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetChallengeReward({ address: key, data: value })),
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
export default ChallengeRewardWatcher
