import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'

import { useAvailableTickets } from '../lottery/useAvailableTickets'
import { useGetEstimateReward } from '../lottery/useGetEstimateReward'
import { useGetTicketPickerData } from '../lottery/useGetTicketPickerData'

export type SpinResult = {}

export const useSpin = (campaign: string) => {
  const availableTickets = useAvailableTickets(campaign)
  const getEstimateReward = useGetEstimateReward(campaign)
  const getTicketPickerData = useGetTicketPickerData()

  const spin = useCallback(
    async (amount: number): Promise<string[]> => {
      const tickets = Object.keys(availableTickets)
      if (tickets.length < amount) {
        throw new Error('Insufficient ticket')
      }
      const selectedTickets: string[] = tickets.slice(0, amount)
      let txs: web3.Transaction[] = []
      // Initialize lottery info if need
      try {
        const { lotteryInfo } = await window.luckyWheel.deriveCampaignPDAs(
          new web3.PublicKey(campaign),
        )
        await window.luckyWheel.program.account.lotteryInfo.fetch(lotteryInfo)
      } catch (error) {
        const { tx: txCreateInfo } =
          await window.luckyWheel.initializeLotteryInfo({
            campaign: new web3.PublicKey(campaign),
            sendAndConfirm: false,
          })
        txs.push(txCreateInfo)
      }
      // Spin transaction
      const spinTxs = selectedTickets.map(async (ticket) => {
        const pickerData = await getTicketPickerData(ticket)
        const estimateRewards = await getEstimateReward(pickerData.luckyNumber)
        const tx = new web3.Transaction()

        // Pick lucky number
        const { tx: txPick } = await window.luckyWheel.pickLuckyNumber({
          ...pickerData,
          sendAndConfirm: false,
        })
        tx.add(txPick)

        const { tx: checkPrize } = await window.luckyWheel.checkPrize({
          ...pickerData,
          rewards: estimateRewards,
          sendAndConfirm: false,
        })
        tx.add(checkPrize)
        return tx
      })
      txs = txs.concat(await Promise.all(spinTxs))

      await window.luckyWheel.provider.sendAll(
        txs.map((tx) => {
          return { tx }
        }),
      )
      return selectedTickets
    },
    [availableTickets, campaign, getEstimateReward, getTicketPickerData],
  )

  return spin
}
