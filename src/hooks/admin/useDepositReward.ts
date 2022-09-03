import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

type onDepositRewardParams = {
  mint: string
  campaign: string
  totalPrize: number
  reward: string
}

export const useDepositReward = () => {
  const [loading, setLoading] = useState(false)

  const onDepositReward = async ({
    mint,
    campaign,
    totalPrize,
    reward,
  }: onDepositRewardParams) => {
    setLoading(true)
    try {
      const { txId } = await window.luckyWheel.depositReward({
        campaign: new web3.PublicKey(campaign),
        reward: new web3.PublicKey(reward),
        totalPrize: new BN(totalPrize),
        mint: new web3.PublicKey(mint),
      })

      notifySuccess('Deposit reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return { onDepositReward, loading }
}
