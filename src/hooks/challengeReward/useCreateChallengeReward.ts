import { useCallback, useState } from 'react'
import { BN, web3, Address } from '@project-serum/anchor'
import { RewardType } from '@sentre/lucky-wheel-core'

import { notifyError, notifySuccess } from 'helper'

type CreateChallengeRewardParams = {
  amount: BN
  campaign: Address
  rewardMint: Address
  rewardType: RewardType
  totalPicked: BN
}

export const useCreateChallengeReward = () => {
  const [loading, setLoading] = useState(false)

  const createChallengeReward = useCallback(
    async ({
      amount,
      campaign,
      totalPicked,
      rewardType,
      rewardMint,
    }: CreateChallengeRewardParams) => {
      setLoading(true)
      try {
        const campaignPk = new web3.PublicKey(campaign)
        const challengeReward = web3.Keypair.generate()

        const { txId } = await window.luckyWheel.initializeChallengeReward({
          campaign: campaignPk,
          rewardMint: new web3.PublicKey(rewardMint),
          amount,
          rewardType,
          challengeReward,
          totalPicked,
          sendAndConfirm: true,
        })

        notifySuccess('Created Challenge reward', txId)
      } catch (error) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [],
  )
  return { createChallengeReward, loading }
}
