import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

type onUpdateRatioParams = {
  campaign: string
  rewardAddress: string
  ratio: number
}

export const useUpdateRatio = () => {
  const [loading, setLoading] = useState(false)

  const updateRatio = async ({
    campaign,
    rewardAddress,
    ratio,
  }: onUpdateRatioParams) => {
    setLoading(true)
    try {
      const toLuckyNumber = new BN('1' + '0'.repeat(18))
        .mul(new BN(ratio * 10 ** 9))
        .div(new BN(100 * 10 ** 9))
      const { txId } = await window.luckyWheel.updateLuckyRatio({
        reward: new web3.PublicKey(rewardAddress),
        campaign: new web3.PublicKey(campaign),
        fromLuckyNumber: new BN(0),
        toLuckyNumber: toLuckyNumber,
      })
      notifySuccess('Update ratio', txId)
    } catch (error) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }
  return { updateRatio, loading }
}
