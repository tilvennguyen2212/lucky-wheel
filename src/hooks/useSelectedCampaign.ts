import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'model'
import { setCampaign } from 'model/main.controller'

export const useSelectedCampaign = () => {
  const selectedCampaign = useSelector((state: AppState) => state.main.campaign)
  const campaigns = useSelector((state: AppState) => state.campaigns)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!campaigns[selectedCampaign] && Object.keys(campaigns).length) {
      dispatch(setCampaign({ campaign: Object.keys(campaigns)[0] }))
    }
    if (!selectedCampaign) {
      dispatch(setCampaign({ campaign: configs.sol.campaignId }))
    }
  }, [campaigns, dispatch, selectedCampaign])

  return selectedCampaign
}
