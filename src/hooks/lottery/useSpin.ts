import { useGetTicketPickerData } from './useGetTicketPickerData'
import { useCallback } from 'react'

import { useAvailableTickets } from './useAvailableTickets'
import { useGetEstimateReward } from './useGetEstimateReward'
import { web3 } from '@project-serum/anchor'

export type SpinResult = {}

export const useSpin = (campaign: string) => {
  const getEstimateReward = useGetEstimateReward(campaign)
  const availableTickets = useAvailableTickets(campaign)
  const getTicketPickerData = useGetTicketPickerData()

  const spin = useCallback(async () => {
    const ticket = Object.keys(availableTickets)[0]
    const pickerData = await getTicketPickerData(ticket)
    const estimateReward = await getEstimateReward(pickerData.luckyNumber)

    if (!estimateReward) {
      await window.luckyWheel.closeTicket({
        ...pickerData,
      })
      return estimateReward
    }

    const tx = new web3.Transaction()
    // Pick lucky number
    const { tx: txPick } = await window.luckyWheel.pickLuckyNumber({
      ...pickerData,
      sendAndConfirm: false,
    })
    tx.add(txPick)
    // Reward
    const { tx: checkPrize } = await window.luckyWheel.checkPrize({
      ...pickerData,
      reward: new web3.PublicKey(estimateReward),
      sendAndConfirm: false,
    })
    tx.add(checkPrize)
    await window.luckyWheel.provider.sendAndConfirm(tx)
    return estimateReward
  }, [availableTickets, getEstimateReward, getTicketPickerData])

  return spin
}
