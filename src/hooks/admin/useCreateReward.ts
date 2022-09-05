import { useCallback, useState } from 'react'
import { BN, web3, Address } from '@project-serum/anchor'
import { RewardType } from '@sentre/lucky-wheel-core'

import { notifyError, notifySuccess } from 'helper'

type CreateRewardParams = {
  prizeAmount: BN
  campaign: Address
  rewardMint: Address
  ratio: number
  rewardType: RewardType
}

export const useCreateReward = () => {
  const [loading, setLoading] = useState(false)

  const createReward = useCallback(
    async ({
      prizeAmount,
      campaign,
      ratio,
      rewardType,
      rewardMint,
    }: CreateRewardParams) => {
      setLoading(true)
      try {
        const campaignPk = new web3.PublicKey(campaign)
        const reward = web3.Keypair.generate()

        const { tx: txReward } = await window.luckyWheel.initializeReward({
          campaign: campaignPk,
          rewardMint: new web3.PublicKey(rewardMint),
          prizeAmount,
          rewardType,
          reward,
          sendAndConfirm: false,
        })

        const toLuckyNumber = new BN('1' + '0'.repeat(18))
          .mul(new BN(ratio * 10 ** 9))
          .div(new BN(100 * 10 ** 9))
        const { tx: txLuckyRatio } = await window.luckyWheel.updateLuckyRatio({
          campaign: new web3.PublicKey(campaign),
          reward: reward.publicKey,
          fromLuckyNumber: new BN(0),
          toLuckyNumber: toLuckyNumber,
          sendAndConfirm: false,
        })

        const tx = new web3.Transaction()
        tx.add(txReward)
        tx.add(txLuckyRatio)

        const txId = await window.luckyWheel.provider.sendAndConfirm(tx, [
          reward,
        ])
        notifySuccess('Create reward', txId)
      } catch (error) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [],
  )
  return { createReward, loading }
}
