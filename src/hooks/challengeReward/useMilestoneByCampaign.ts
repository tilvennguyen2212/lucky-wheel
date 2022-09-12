import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { useChallengeRewardByCampaign } from './useChallengeRewardByCampaign'

export const useMilestoneByCampaign = (selectedCampaign: string) => {
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)

  const getMilestoneCampaign = useCallback(() => {
    const result: BN[] = []
    for (const rewardAddress in challengeRewards) {
      const totalPicked = challengeRewards[rewardAddress].totalPicked
      if (result.findIndex((item) => item.eq(totalPicked)) >= 0) continue
      result.push(totalPicked)
    }
    result.sort((a, b) => a.toNumber() - b.toNumber())

    return result
  }, [challengeRewards])

  return { getMilestoneCampaign }
}
