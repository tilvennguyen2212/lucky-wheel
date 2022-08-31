import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'

import { useAvailableTickets } from '../lottery/useAvailableTickets'
import { useGetEstimateReward } from '../lottery/useGetEstimateReward'
import { useGetTicketPickerData } from '../lottery/useGetTicketPickerData'

export type SpinResult = {}

export const useSpin = (campaign: string) => {
  const getEstimateReward = useGetEstimateReward(campaign)
  const availableTickets = useAvailableTickets(campaign)
  const getTicketPickerData = useGetTicketPickerData()

  const spin = useCallback(async (): Promise<string> => {
    const ticket = Object.keys(availableTickets)[0]
    const pickerData = await getTicketPickerData(ticket)
    const estimateRewards = await getEstimateReward(pickerData.luckyNumber)

    const tx = new web3.Transaction()
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
      tx.add(txCreateInfo)
    }
    // Pick lucky number
    const { tx: txPick } = await window.luckyWheel.pickLuckyNumber({
      ...pickerData,
      sendAndConfirm: false,
    })
    tx.add(txPick)
    // Reward
    const { tx: checkPrize } = await window.luckyWheel.checkPrize({
      ...pickerData,
      rewards: estimateRewards,
      sendAndConfirm: false,
    })
    tx.add(checkPrize)
    // Close if lose
    if (!estimateRewards.length) {
      const { tx: txClose } = await window.luckyWheel.closeTicket({
        ...pickerData,
        sendAndConfirm: false,
      })
      tx.add(txClose)
    }
    await window.luckyWheel.provider.sendAndConfirm(tx)
    return ticket
  }, [availableTickets, campaign, getEstimateReward, getTicketPickerData])

  return spin
}
