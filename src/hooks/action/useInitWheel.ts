import { useCallback } from 'react'
import { Keypair, Transaction } from '@solana/web3.js'
import configs from 'configs'
import axios from 'axios'
import { BN } from 'bn.js'
import { publicKeyConvert } from 'secp256k1'

export const useInitWheel = () => {
  const createWheel = useCallback(async () => {
    const CAMPAIGN = Keypair.generate()

    const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
      withCredentials: true,
    })
    const decode = publicKeyConvert(Buffer.from(picker, 'hex'), false)
    const trans = new Transaction()
    const { tx: txCampaign } = await window.luckyWheel.initializeCampaign({
      picker: Array.from(decode).slice(1, 65),
      startDate: new BN(0),
      endDate: new BN(0),
      campaign: CAMPAIGN,
      sendAndConfirm: false,
    })
    trans.add(txCampaign)
  }, [])

  return { createWheel }
}
