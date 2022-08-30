import { Fragment, useMemo } from 'react'
import CampaignsWatcher from './campaign.watcher'
import RewardsWatcher from './rewards.watcher'
import { useWatcherLoading } from './watcher'

import Loading from 'components/loading'

export const AppWatcher: React.FC = ({ children }) => {
  const [loadingInfo] = useWatcherLoading()

  const loading = useMemo(
    () =>
      !Object.values(loadingInfo).length ||
      Object.values(loadingInfo).includes(true),
    [loadingInfo],
  )

  return (
    <Fragment>
      <CampaignsWatcher />
      <RewardsWatcher />
      {loading ? <Loading /> : children}
    </Fragment>
  )
}
