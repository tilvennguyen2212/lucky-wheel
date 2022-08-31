import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { intCampaign, upsetCampaign } from 'model/campaigns.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'campaign'
const FILTER: web3.GetProgramAccountsFilter[] = []

const CampaignsWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(intCampaign(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetCampaign({ address: key, data: value })),
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
export default CampaignsWatcher
