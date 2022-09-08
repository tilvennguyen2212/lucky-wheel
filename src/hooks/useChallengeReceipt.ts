import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { AppState } from 'model'
import { useSelectedCampaign } from './useSelectedCampaign'
import { useChallengeRewardByCampaign } from './challengeReward/useChallengeRewardByCampaign'

export const useChallengeReceipts = () => {
  const challengeReceipts = useSelector(
    (state: AppState) => state.challengeReceipts,
  )
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)

  const checkExistedReceipt = useCallback(
    async (challengeAddress) => {
      const { mint } = challengeRewards[challengeAddress]
      const { challengeRewardReceipt } =
        await window.luckyWheel.deriveChallengeRewardPDAs(
          new web3.PublicKey(challengeAddress),
          mint,
        )
      return Object.keys(challengeReceipts).includes(
        challengeRewardReceipt.toBase58(),
      )
    },
    [challengeReceipts, challengeRewards],
  )

  return { challengeReceipts, checkExistedReceipt }
}
