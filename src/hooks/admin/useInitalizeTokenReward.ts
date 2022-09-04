import { useCallback, useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'
import { useGetMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { notifyError, notifySuccess } from 'helper'

type OnInitializeTokenRewardParams = {
  mint: string
  prizeAmount: string
  campaign: string
  ratio: number
}

export const useInitializeTokenReward = () => {
  const [loading, setLoading] = useState(false)
  const getMintDecimals = useGetMintDecimals()

  const onInitializeTokenReward = useCallback(
    async ({
      mint,
      prizeAmount,
      campaign,
      ratio,
    }: OnInitializeTokenRewardParams) => {
      setLoading(true)
      try {
        const decimals = await getMintDecimals({ mintAddress: mint })
        if (!decimals) throw new Error("Can't get mint decimals")

        const prizeAmountBN = utilsBN.decimalize(prizeAmount, decimals)
        const reward = web3.Keypair.generate()

        const { tx: txReward } = await window.luckyWheel.initializeReward({
          campaign: new web3.PublicKey(campaign),
          rewardMint: new web3.PublicKey(mint),
          prizeAmount: prizeAmountBN,
          rewardType: REWARD_TYPE.token,
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
    [getMintDecimals],
  )
  return { onInitializeTokenReward, loading }
}
