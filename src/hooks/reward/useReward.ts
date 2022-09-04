import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useReward = (rewardAddress: string) => {
  const reward = useSelector((state: AppState) => state.rewards[rewardAddress])
  return reward
}
