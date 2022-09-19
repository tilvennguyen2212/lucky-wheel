import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import useAllTicketsByCompagin from 'hooks/ticket/useAllTicketsByCompagin'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'

type MintPrize = Record<string, BN>
type AvailabelMintReward = Record<string, MintPrize>

const usePrizeAmountRewardTickets = (campagignAddress: string) => {
  const { getTickets } = useAllTicketsByCompagin(campagignAddress)
  const rewards = useRewardByCampaign(campagignAddress)

  const getPrizeAmountTickets = useCallback(async () => {
    const tickets = await getTickets()

    let availableMintRewards: AvailabelMintReward = {}

    for (const key in tickets) {
      const { state, reward, authority } = tickets[key]
      const rewardData = rewards[reward.toBase58()]

      if (
        (!state.claimed && !state.won) ||
        !rewardData ||
        !rewardData.rewardType.token
      )
        continue

      const mintRewards = availableMintRewards[authority.toBase58()] || {}

      const prevAmount = mintRewards[rewardData.mint.toBase58()] || new BN(0)
      const nextAmount = rewardData.prizeAmount

      availableMintRewards[authority.toBase58()] = Object.assign(
        { ...availableMintRewards[authority.toBase58()] },
        {
          [rewardData.mint.toBase58()]: prevAmount.add(nextAmount),
        },
      )
    }
    return availableMintRewards
  }, [getTickets, rewards])

  return { getPrizeAmountTickets }
}

export default usePrizeAmountRewardTickets
