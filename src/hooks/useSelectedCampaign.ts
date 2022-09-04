import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'model'
import { setCampaign } from 'model/main.controller'

export const useSelectedCampaign = () => {
  const selectedCampaign = useSelector((state: AppState) => state.main.campaign)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectedCampaign) {
      dispatch(setCampaign({ campaign: configs.sol.campaignId }))
    }
  }, [dispatch, selectedCampaign])

  return selectedCampaign
}
