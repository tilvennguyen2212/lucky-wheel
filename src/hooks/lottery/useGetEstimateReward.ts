import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

export const useGetEstimateReward = (campaign: string) => {
  const rewards = useRewardByCampaign(campaign)

  const getEstimateReward = useCallback(
    async (luckyNumber: BN) => {
      let selectedReward: null | string = null
      for (const rewardAddr in rewards) {
        const { fromLuckyNumber, toLuckyNumber, reservePrize } =
          rewards[rewardAddr]
        if (
          fromLuckyNumber.lt(luckyNumber) &&
          toLuckyNumber.gt(luckyNumber) &&
          !reservePrize.isZero()
        ) {
          if (selectedReward === null) selectedReward = rewardAddr
          // Check best reward
          else if (toLuckyNumber.lt(rewards[selectedReward].toLuckyNumber))
            selectedReward = rewardAddr
        }
      }
      return selectedReward
    },
    [rewards],
  )

  return getEstimateReward
}
