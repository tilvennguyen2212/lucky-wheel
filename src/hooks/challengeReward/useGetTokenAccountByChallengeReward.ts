import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'
import { splt } from '@sentre/senhub'

import { AppDispatch } from 'model'
import { getChallengeReward } from 'model/challengeRewards.controller'

export const useGetTokenAccountByChallengeReward = () => {
  const dispatch = useDispatch<AppDispatch>()

  const getTokenAccountByChallengeReward = useCallback(
    async (challengeRewardAddr: string) => {
      const { [challengeRewardAddr]: rewardData } = await dispatch(
        getChallengeReward({ address: challengeRewardAddr }),
      ).unwrap()

      const { challengeRewardTreasurer } =
        await window.luckyWheel.deriveChallengeRewardPDAs(
          new web3.PublicKey(challengeRewardAddr),
          rewardData.mint,
        )
      // Get all token accounts
      const { value } = await splt.connection.getTokenAccountsByOwner(
        challengeRewardTreasurer,
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

  return getTokenAccountByChallengeReward
}
