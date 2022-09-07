import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BN, web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { AppDispatch } from 'model'
import { getReward } from 'model/rewards.controller'

type WithdrawRewardParams = {
  mint: string
  totalPrize: number
  reward: string
}

export const useWithdrawReward = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const withdrawReward = async ({
    totalPrize,
    reward,
    mint,
  }: WithdrawRewardParams) => {
    setLoading(true)
    const { [reward]: rewardData } = await dispatch(
      getReward({ address: reward }),
    ).unwrap()

    try {
      const { txId } = await window.luckyWheel.withdrawReward({
        campaign: rewardData.campaign,
        reward: new web3.PublicKey(reward),
        totalPrize: new BN(totalPrize),
        mint: new web3.PublicKey(mint),
      })
      notifySuccess('Withdraw reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return { withdrawReward, loading }
}
