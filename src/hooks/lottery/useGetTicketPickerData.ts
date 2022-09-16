import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { web3, BN } from '@project-serum/anchor'
import axios from 'axios'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { AppState } from 'model'
import configs from 'configs'

export type PickerData = {
  ticket: web3.PublicKey
  recoveryId: number
  signature: number[]
  luckyNumber: BN
}

const generate_lucky_number = (signature: number[]) => {
  let lucky_number = new BN(0)
  for (let i = 0; i < 18; i++) {
    let val = new BN(signature[i] % 10)
    lucky_number = lucky_number.add(val.mul(new BN(1 + '0'.repeat(i))))
  }
  return lucky_number
}

export const useGetTicketPickerData = () => {
  const campaignSelected = useSelectedCampaign()
  const campaignPicker = useSelector(
    (state: AppState) => state.campaigns[campaignSelected].picker,
  )
  const getTicketPickerData = useCallback(
    async (ticketAddress: string): Promise<PickerData> => {
      const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
        withCredentials: true,
      })
      const pickerPublickey = await window.luckyWheel.decodePickerPublickey(
        picker,
      )

      let pickerData = window.luckyWheel.picker.sign(
        new web3.PublicKey(ticketAddress).toBuffer(),
      )

      if (JSON.stringify(campaignPicker) === JSON.stringify(pickerPublickey)) {
        const { data } = await axios.get<{
          pubKey: string
          signature: string
          recid: number
        }>(configs.api.lottery.luckyNumber + ticketAddress, {
          withCredentials: true,
        })
        pickerData = {
          signature: Buffer.from(data.signature, 'hex'),
          recid: data.recid,
        }
      }

      const signature = Array.from(pickerData.signature)
      return {
        ticket: new web3.PublicKey(ticketAddress),
        recoveryId: pickerData.recid,
        signature,
        luckyNumber: generate_lucky_number(signature),
      }
    },
    [campaignPicker],
  )

  return getTicketPickerData
}
