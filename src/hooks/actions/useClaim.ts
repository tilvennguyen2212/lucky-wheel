import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import { splt } from '@sentre/senhub'

import { notifyError } from 'helper'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useRedeemTicket } from './useRedeemTicket'

export const useClaim = () => {
  const [loading, setLoading] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const rewards = useRewardByCampaign(selectedCampaign)
  const tickets = useTicketByCampaign(selectedCampaign)
  const redeemTicket = useRedeemTicket()

  const getMintReward = useCallback(
    async (rewardAddress: string) => {
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
        let transactions: {
          tx: web3.Transaction
          signers: web3.Keypair[]
        }[] = []

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

        const { tx: txClaim } = await window.luckyWheel.claim({
          ticket: new web3.PublicKey(ticketAddress),
          mint,
          sendAndConfirm: false,
        })
        transactions.push({ tx: txClaim, signers: [] })

        // Redeem ticket
        if (rewardType.ticket) {
          const txRedeem = await redeemTicket(prizeAmount.toNumber())
          transactions = transactions.concat(...txRedeem)
        }

        await window.luckyWheel.provider.sendAll(
          transactions.map(({ tx, signers }) => {
            return { tx, signers }
          }),
          { commitment: 'finalized', preflightCommitment: 'finalized' },
        )

        return window.notify({
          type: 'success',
          description: `Claimed reward successfully.`,
        })
      } catch (error) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [getMintReward, redeemTicket, rewards, tickets],
  )
  return { onClaim, loading }
}
