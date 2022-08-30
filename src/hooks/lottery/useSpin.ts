import { useCallback } from 'react'
import axios from 'axios'
import { web3 } from '@project-serum/anchor'

import { notifyError, notifySuccess } from 'helper'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'
import configs from 'configs'

const getTicketPickerData = async (ticketAddress: string) => {
  const { data: pickerData } = await axios.get<{
    pubKey: string
    signature: string
    recid: number
  }>(configs.api.lottery.luckyNumber + ticketAddress, {
    withCredentials: true,
  })
  return pickerData
}

export const useSpin = (campaign: string) => {
  const tickets = useTicketByOwner(campaign)

  const spin = useCallback(async () => {
    try {
      const ticket = Object.keys(tickets)[0]
      console.log('ticket', tickets[ticket])
      const pickerData = await getTicketPickerData(ticket)

      const { txId } = await window.luckyWheel.pickLuckyNumber({
        ticket: new web3.PublicKey(ticket),
        recoveryId: pickerData.recid,
        signature: Array.from(Buffer.from(pickerData.signature, 'hex')),
      })
      console.log('ticket', pickerData)
      notifySuccess('Pick lucky number', txId)
    } catch (error) {
      notifyError(error)
    }
  }, [tickets])

  return spin
}
