import { Fragment, useEffect, useState } from 'react'

import Loading from 'components/loading'

import CampaignsWatcher from './campaign.watcher'
import RewardsWatcher from './rewards.watcher'
import TicketsWatcher from './tickets.watcher'
import LotteryInfoWatcher from './lotteryInfo.watcher'
import ChallengeRewardWatcher from './challengeReward.watcher'
import ChallengeReceiptWatcher from './challengeReceipt.watcher'

export const AppWatcher: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <Fragment>
      <CampaignsWatcher />
      <RewardsWatcher />
      <TicketsWatcher />
      <LotteryInfoWatcher />
      <ChallengeRewardWatcher />
      <ChallengeReceiptWatcher />
      {loading ? <Loading /> : children}
    </Fragment>
  )
}
