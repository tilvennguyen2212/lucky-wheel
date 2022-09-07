import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'

type WithdrawRewardParams = {
  mint: string
  amount: number
  challengeReward: string
}

export const useWithdrawChallengeReward = () => {
  const [loading, setLoading] = useState(false)

  const withdrawChallengeReward = async ({
    challengeReward,
    mint,
    amount,
  }: WithdrawRewardParams) => {
    setLoading(true)

    try {
      const { txId } = await window.luckyWheel.withdrawChallengeReward({
        challengeReward: new web3.PublicKey(challengeReward),
        amount: new BN(amount),
        rewardMint: new web3.PublicKey(mint),
      })
      notifySuccess('Withdraw reward', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return { withdrawChallengeReward, loading }
}
