import { useCallback, useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { notifyError, notifySuccess } from 'helper'

type CreateTicketRewardParams = {
  prizeAmount: string
  campaign: string
  ratio: number
}

export const useCreateTicketReward = () => {
  const [loading, setLoading] = useState(false)

  const createTicketReward = useCallback(
    async ({ prizeAmount, campaign, ratio }: CreateTicketRewardParams) => {
      setLoading(true)
      try {
        const campaignPk = new web3.PublicKey(campaign)

        const campaignPDAs = await window.luckyWheel.deriveCampaignPDAs(
          campaignPk,
        )
        const prizeAmountBN = new BN(prizeAmount)
        const reward = web3.Keypair.generate()

        const { tx: txReward } = await window.luckyWheel.initializeReward({
          campaign: campaignPk,
          rewardMint: campaignPDAs.ticketMint,
          prizeAmount: prizeAmountBN,
          rewardType: REWARD_TYPE.ticket,
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
  return { createTicketReward, loading }
}
