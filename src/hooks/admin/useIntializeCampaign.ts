import { useCallback, useState } from 'react'
import BN from 'bn.js'

import { notifyError, notifySuccess } from 'helper'

export const useInitializeCampaign = () => {
  const [loading, setLoading] = useState(false)

  const onInitializeCampaign = useCallback(async () => {
    setLoading(true)
    try {
      // const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
      //   withCredentials: true,
      // })
      // const pickerPublickey = await window.luckyWheel.decodePickerPublickey(
      //   picker,
      // )
      const pickerPublickey = Array.from(window.luckyWheel.picker.pubKey).slice(
        1,
        65,
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
