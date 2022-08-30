import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { RewardData } from 'lucky-wheel-core'

export const useRewardByCampaign = (campaignAddress: string) => {
  const allRewards = useSelector((state: AppState) => state.rewards)

  const filteredRewards = useMemo(() => {
    const rewards: RewardData[] = []
    for (const reward of Object.values(allRewards)) {
      const { campaign } = reward
      if (campaign.toBase58() !== campaignAddress) continue
      rewards.push(reward)
    }
    return rewards
  }, [allRewards, campaignAddress])

  return filteredRewards
}
