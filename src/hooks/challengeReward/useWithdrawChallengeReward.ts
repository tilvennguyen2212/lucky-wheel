import { useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { useGetMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { notifyError, notifySuccess } from 'helper'

type WithdrawRewardParams = {
  mint: string
  amount: number
  challengeReward: string
}

export const useWithdrawChallengeReward = () => {
  const [loading, setLoading] = useState(false)
  const getDecimal = useGetMintDecimals()

  const withdrawChallengeReward = async ({
    challengeReward,
    mint,
    amount,
  }: WithdrawRewardParams) => {
    setLoading(true)

    try {
      const decimals = (await getDecimal({ mintAddress: mint })) || 0

      const { txId } = await window.luckyWheel.withdrawChallengeReward({
        challengeReward: new web3.PublicKey(challengeReward),
        amount: utilsBN.decimalize(amount, decimals),
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
