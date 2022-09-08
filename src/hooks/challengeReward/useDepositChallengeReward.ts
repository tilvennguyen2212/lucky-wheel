import { useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useGetMintDecimals } from '@sentre/senhub/dist'
import { utilsBN } from '@sen-use/web3'

type onDepositRewardParams = {
  mint: string
  campaign: string
  amount: number
  challengeReward: string
}

export const useDepositChallengeReward = () => {
  const [loading, setLoading] = useState(false)
  const getDecimal = useGetMintDecimals()

  const onDepositChallengeReward = async ({
    mint,
    campaign,
    amount,
    challengeReward,
  }: onDepositRewardParams) => {
    setLoading(true)
    try {
      const decimals = (await getDecimal({ mintAddress: mint })) || 0
      const { txId } = await window.luckyWheel.depositChallengeReward({
        campaign: new web3.PublicKey(campaign),
        challengeReward: new web3.PublicKey(challengeReward),
        amount: utilsBN.decimalize(amount, decimals),
        rewardMint: new web3.PublicKey(mint),
      })
      return notifySuccess('Deposited', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return { onDepositChallengeReward, loading }
}
