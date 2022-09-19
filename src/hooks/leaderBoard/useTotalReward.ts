import { useCallback, useState } from 'react'
import { utilsBN } from '@sen-use/web3'

import { useGetMintPrice } from '@sen-use/app'
import { useGetMintDecimals } from '@sentre/senhub'
import usePrizeAmountRewardTickets from './usePrizeAmountRewardTickets'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

type RewardAvailabelState = { authority: string; total: number }
type MintPriceData = { decimals: number; mintPrice: number }

const useTotalReward = () => {
  const [loading, setLoading] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const { getPrizeAmountTickets } =
    usePrizeAmountRewardTickets(selectedCampaign)
  const getMintPrice = useGetMintPrice()
  const getMintDecimals = useGetMintDecimals()

  const calculateTotalRewards = useCallback(async () => {
    try {
      setLoading(true)
      const availableMintRewards = await getPrizeAmountTickets()
      let nextRewards: RewardAvailabelState[] = []
      const mintData: Record<string, MintPriceData> = {}

      for (const authority in availableMintRewards) {
        const rewardData = availableMintRewards[authority]
        if (!rewardData) continue

        let total = 0
        for (const mintAddress in rewardData) {
          const prizeAmount = rewardData[mintAddress]
          const mint = mintData[mintAddress] || {}

          let decimals = mint.decimals
          let mintPrice = mint.mintPrice

          if (!decimals && !mintPrice) {
            decimals = (await getMintDecimals({ mintAddress })) || 0
            mintPrice = (await getMintPrice(mintAddress)) || 0
            mintData[mintAddress] = Object.assign(
              { ...mintData[mintAddress] },
              {
                [mintAddress]: { decimals, mintPrice },
              },
            )
          }

          if (!mintPrice) continue
          total +=
            mintPrice * Number(utilsBN.undecimalize(prizeAmount, decimals))
        }

        nextRewards.push({ authority, total })
      }

      const sortedRewards = nextRewards
        .sort((a, b) => b.total - a.total)
        .map(({ authority, total }, index) => {
          return { authority, total, index }
        })

      return sortedRewards
    } catch (err) {
      return []
    } finally {
      setLoading(false)
    }
  }, [getMintDecimals, getMintPrice, getPrizeAmountTickets])

  return { calculateTotalRewards, loading }
}

export default useTotalReward
