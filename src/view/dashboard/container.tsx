import { Fragment } from 'react'

import Reward from './reward'
import Spin from './spin'

import { TabId } from 'constant'
import LeaderBoard from './leaderBoard'

type ContainerProps = {
  tabId: string
}

const Container = ({ tabId }: ContainerProps) => {
  if (tabId === TabId.Reward) return <Reward />
  if (tabId === TabId.LeaderBoard) return <LeaderBoard />
  if (tabId === TabId.Spin) return <Spin />
  return <Fragment />
}

export default Container
