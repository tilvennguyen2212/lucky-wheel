import { Fragment } from 'react'

import Reward from './reward'
import Spin from './spin'

import { TabId } from 'constant'

type ContainerProps = {
  tabId: string
}

const Container = ({ tabId }: ContainerProps) => {
  if (tabId === TabId.Reward) return <Reward />
  if (tabId === TabId.Spin) return <Spin />
  return <Fragment />
}

export default Container
