import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { SENTRE_CAMPAIGN } from 'constant'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { AccountsState } from '@sentre/senhub/dist/store/accounts.reducer'

export const useClaim = () => {
  const [loading, setLoading] = useState(false)
  const rewards = useRewardByCampaign(SENTRE_CAMPAIGN)
  const tickets = useTicketByCampaign(SENTRE_CAMPAIGN)

  const getAccounts = useCallback(
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
      const bulk: AccountsState = {}
      value.forEach(({ pubkey, account: { data: buf } }) => {
        const address = pubkey.toBase58()
        const data = splt.parseAccountData(buf)
        return (bulk[address] = data)
      })
      return bulk
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
          const accounts = await getAccounts(rewardAddress)
          let index = 0

          for (const address in accounts) {
            const { amount } = accounts[address]
            if (amount.toString() === '0') index++
          }
          mint = new web3.PublicKey(Object.values(accounts)[index].mint)
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
              campaign: new web3.PublicKey(SENTRE_CAMPAIGN),
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
    [getAccounts, rewards, tickets],
  )
  return { onClaim, loading }
}
