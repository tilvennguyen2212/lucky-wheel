import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

export const useClaim = () => {
  const [loading, setLoading] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)
  const tickets = useTicketByCampaign(selectedCampaign)

  const getMintReward = useCallback(
    async (rewardAddress: string) => {
      const splt = window.sentre.splt
      const { mint } = rewards[rewardAddress]
      const { rewardTreasurer } = await window.luckyWheel.deriveRewardPDAs(
        new web3.PublicKey(rewardAddress),
        mint,
      )
      const { value } = await splt.connection.getTokenAccountsByOwner(
        rewardTreasurer,
        { programId: splt.spltProgramId },
      )

      for (const valData of value) {
        const accountData = splt.parseAccountData(valData.account.data)
        if (Number(accountData.amount.toString()) > 0)
          return new web3.PublicKey(accountData.mint)
      }
      throw new Error("Can't find account")
    },
    [rewards],
  )

  const onClaim = useCallback(
    async (ticketAddress: string) => {
      try {
        setLoading(true)
        const rewardAddress = tickets[ticketAddress].reward.toBase58()
        const {
          rewardType,
          mint: mintReward,
          prizeAmount,
        } = rewards[rewardAddress]

        let mint = mintReward

        //Get mint NFT
        if (rewardType.nftCollection) {
          mint = await getMintReward(rewardAddress)
        }

        const tx = new web3.Transaction()
        const signer: web3.Keypair[] = []
        const { tx: txClaim } = await window.luckyWheel.claim({
          ticket: new web3.PublicKey(ticketAddress),
          mint,
          sendAndConfirm: false,
        })
        tx.add(txClaim)

        // Redeem ticket
        if (rewardType.ticket) {
          for (let i = 0; i < prizeAmount.toNumber(); i++) {
            const newTicket = web3.Keypair.generate()
            const { tx: txRedeem } = await window.luckyWheel.redeemTicket({
              campaign: new web3.PublicKey(selectedCampaign),
              ticket: newTicket,
              sendAndConfirm: false,
            })
            tx.add(txRedeem)
            signer.push(newTicket)
          }
        }
        const txId = await window.luckyWheel.provider.sendAndConfirm(tx, signer)
        return notifySuccess('Claimed', txId)
      } catch (error) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [getMintReward, rewards, selectedCampaign, tickets],
  )
  return { onClaim, loading }
}
