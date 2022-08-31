import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { web3, BN } from '@project-serum/anchor'
import { useWalletAddress } from '@sentre/senhub'
import { LotteryInfoData } from '@sentre/lucky-wheel-core'

import { AppState } from 'model'

export const useLotteryInfo = (campaign: string) => {
  const lotteryInfos = useSelector((state: AppState) => state.lotteryInfos)
  const walletAddress = useWalletAddress()

  const lotteryInfoData = Object.values(lotteryInfos).find(
    (data) =>
      data.campaign.toBase58() === campaign &&
      data.authority.toBase58() === walletAddress,
  )

  const DEFAULT_DATA: LotteryInfoData = useMemo(() => {
    return {
      authority: new web3.PublicKey(walletAddress),
      campaign: new web3.PublicKey(campaign),
      totalPicked: new BN(0),
      totalClaimed: new BN(0),
    }
  }, [campaign, walletAddress])

  return lotteryInfoData || DEFAULT_DATA
}
