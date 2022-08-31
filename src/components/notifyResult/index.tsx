import NotifyGoodLuck from './goodLuck'
import Congrats from './congrats'

import { Reward } from 'constant'

type NotifyResultProps = {
  resultReward: string
  visible: boolean
  onClose: (value: false) => void
}

const NotifyResult = ({
  resultReward,
  visible,
  onClose,
}: NotifyResultProps) => {
  if (resultReward !== Reward.GoodLuck && resultReward)
    return (
      <Congrats
        resultReward={resultReward}
        visible={visible}
        onClose={onClose}
      />
    )
  return <NotifyGoodLuck visible={visible} onClose={onClose} />
}

export default NotifyResult
