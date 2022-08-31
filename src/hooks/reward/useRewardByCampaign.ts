import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { RewardState } from 'model/rewards.controller'

export const useRewardByCampaign = (campaignAddress: string) => {
  const allRewards = useSelector((state: AppState) => state.rewards)

  const filteredRewards = useMemo(() => {
    const bulk: RewardState = {}
    for (const address in allRewards) {
      const { campaign } = allRewards[address]
      if (campaign.toBase58() !== campaignAddress) continue
      bulk[address] = allRewards[address]
    }
    return bulk
  }, [allRewards, campaignAddress])

  return filteredRewards
}
