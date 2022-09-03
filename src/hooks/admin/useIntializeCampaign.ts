import { useCallback, useState } from 'react'
import axios from 'axios'
import BN from 'bn.js'

import { notifyError, notifySuccess } from 'helper'
import configs from 'configs'

export const useInitializeCampaign = () => {
  const [loading, setLoading] = useState(false)

  const onInitializeCampaign = useCallback(async () => {
    setLoading(true)
    try {
      const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
        withCredentials: true,
      })
      const pickerPublickey = await window.luckyWheel.decodePickerPublickey(
        picker,
      )

      const { txId } = await window.luckyWheel.initializeCampaign({
        picker: pickerPublickey,
        startDate: new BN(0),
        endDate: new BN(0),
      })
      notifySuccess('Create campaign', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [])
  return { onInitializeCampaign, loading }
}
