import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

type onDepositRewardParams = {
  mint: string
  campaign: string
  amount: number
  challengeReward: string
}

export const useDepositChallengeReward = () => {
  const [loading, setLoading] = useState(false)

  const onDepositChallengeReward = async ({
    mint,
    campaign,
    amount,
    challengeReward,
  }: onDepositRewardParams) => {
    setLoading(true)
    try {
      const { txId } = await window.luckyWheel.depositChallengeReward({
        campaign: new web3.PublicKey(campaign),
        challengeReward: new web3.PublicKey(challengeReward),
        amount: new BN(amount),
        rewardMint: new web3.PublicKey(mint),
      })

      notifySuccess('Deposit reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return { onDepositChallengeReward, loading }
}
