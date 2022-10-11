import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { Address, web3 } from '@project-serum/anchor'
import { splt } from '@sentre/senhub'

import { AppDispatch } from 'model'
import { getReward } from 'model/rewards.controller'

export const useGetTokenAccountByReward = () => {
  const dispatch = useDispatch<AppDispatch>()

  const getTokenAccountByReward = useCallback(
    async (reward: Address) => {
      const rewardAddr = reward.toString()
      const { [rewardAddr]: rewardData } = await dispatch(
        getReward({ address: rewardAddr }),
      ).unwrap()

      const { rewardTreasurer } = await window.luckyWheel.deriveRewardPDAs(
        new web3.PublicKey(reward),
        rewardData.mint,
      )
      // Get all token accounts
      const { value } = await splt.connection.getTokenAccountsByOwner(
        rewardTreasurer,
        { programId: splt.spltProgramId },
      )
      const tokenAccounts = value.map((valData) =>
        splt.parseAccountData(valData.account.data),
      )
      // Filter token accounts
      return tokenAccounts.filter((data) => Number(data.amount.toString()) > 0)
    },
    [dispatch],
  )

  return getTokenAccountByReward
}
