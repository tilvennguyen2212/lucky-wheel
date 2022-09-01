import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { CampaignState } from 'model/campaigns.controller'

export const useOwnerCampaign = () => {
  const campaigns = useSelector((state: AppState) => state.campaigns)
  const walletAddress = useWalletAddress()

  const filteredRewards = useMemo(() => {
    const bulk: CampaignState = {}
    for (const address in campaigns) {
      const { authority } = campaigns[address]
      if (authority.toBase58() !== walletAddress) continue
      bulk[address] = campaigns[address]
    }
    return bulk
  }, [campaigns, walletAddress])

  return filteredRewards
}
