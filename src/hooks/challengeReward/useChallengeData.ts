import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useChallengeRewardData = (challengeRewardAddress: string) => {
  const challengeRewardData = useSelector(
    (state: AppState) => state.challengeRewards[challengeRewardAddress],
  )
  return challengeRewardData
}
