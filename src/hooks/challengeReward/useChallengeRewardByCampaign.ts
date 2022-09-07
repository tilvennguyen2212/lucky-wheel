import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { ChallengeRewardState } from 'model/challengeRewards.controller'

export const useChallengeRewardByCampaign = (campaignAddress: string) => {
  const challengeRewards = useSelector(
    (state: AppState) => state.challengeRewards,
  )

  const filteredRewards = useMemo(() => {
    const bulk: ChallengeRewardState = {}
    for (const address in challengeRewards) {
      const { campaign } = challengeRewards[address]
      if (campaign.toBase58() !== campaignAddress) continue
      bulk[address] = challengeRewards[address]
    }
    return bulk
  }, [challengeRewards, campaignAddress])

  return filteredRewards
}
