import Challenge from './challenge'
import Reward from './reward'
import Spin from './spin'

import { TabId } from 'constant'

type ContainerProps = {
  tabId: string
}

const Container = ({ tabId }: ContainerProps) => {
  if (tabId === TabId.Challenge) return <Challenge />
  if (tabId === TabId.Reward) return <Reward />

  return <Spin />
}

export default Container
