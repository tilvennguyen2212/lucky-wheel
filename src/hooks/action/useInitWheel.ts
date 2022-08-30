import { useCallback } from 'react'
import { Keypair, Transaction, PublicKey } from '@solana/web3.js'
import { getAnchorProvider } from '@sen-use/web3'
import axios from 'axios'
import { BN } from 'bn.js'
import { publicKeyConvert } from 'secp256k1'
import { rpc, useWalletAddress } from '@sentre/senhub'

import configs from 'configs'
import { notifyError, notifySuccess } from 'helper'
import { Reward } from 'constant'

export type createWheelProps = {
  type: string
  mint?: string
  amount?: number
  frequencyWinning?: number
  numberOfReward?: number
}

export const useInitWheel = () => {
  const address = useWalletAddress()
  const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
  const createWheel = useCallback(
    async (dataCampaigns: createWheelProps[]) => {
      try {
        const CAMPAIGN = Keypair.generate()

        const { data: picker } = await axios.get(
          configs.api.lottery.publicKey,
          {
            withCredentials: true,
          },
        )
        const decode = publicKeyConvert(Buffer.from(picker, 'hex'), false)
        const trans = new Transaction()
        const signers = []
        const { tx: txCampaign } = await window.luckyWheel.initializeCampaign({
          picker: Array.from(decode).slice(1, 65),
          startDate: new BN(0),
          endDate: new BN(100),
          campaign: CAMPAIGN,
          sendAndConfirm: false,
        })
        trans.add(txCampaign)
        signers.push(CAMPAIGN)

        for (const dataItem of dataCampaigns) {
          if (dataItem.type === Reward.Ticket) {
            const TICKET = Keypair.generate()
            const { tx: txReward } = await window.luckyWheel.initializeTicket({
              campaign: CAMPAIGN.publicKey,
              ticket: TICKET,
              sendAndConfirm: false,
            })
            trans.add(txReward)
            signers.push(TICKET)
            continue
          }

          if (
            dataItem.mint &&
            dataItem.amount &&
            dataItem.numberOfReward &&
            dataItem.frequencyWinning
          ) {
            const { tx: txReward } = await window.luckyWheel.initializeReward({
              campaign: CAMPAIGN.publicKey,
              rewardMint: new PublicKey(dataItem.mint),
              prizeAmount: new BN(dataItem.amount),
              fromLuckyNumber: new BN(0),
              toLuckyNumber: new BN(dataItem.frequencyWinning),
              sendAndConfirm: false,
            })
            trans.add(txReward)

            // console.log('chay xung toi day', dataItem.mint)
            // const rewardPDA = await window.luckyWheel.deriveRewardPDAs(
            //   CAMPAIGN.publicKey,
            //   new PublicKey(dataItem.mint),
            // )
            // console.log('go heeekee 1', rewardPDA.reward.toBase58())
            // const { tx: txDeposit } = await window.luckyWheel.depositReward({
            //   reward: rewardPDA.reward,
            //   totalPrize: new BN(2),
            //   sendAndConfirm: false,
            // })
            // console.log('go hereees')
            // trans.add(txDeposit)
          }
        }
        console.log('Send transactions successfully')
        const txId = await provider.sendAndConfirm(trans, signers)
        return notifySuccess('Add new Campaign', txId)
      } catch (er) {
        console.log(er)
        notifyError(er)
      }
    },
    [provider],
  )

  return { createWheel }
}
