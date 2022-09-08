import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useChallengeReceiptByCampaign = (challengeAddresses: string) => {
  const challengeReceipts = useSelector(
    (state: AppState) => state.challengeReceipts,
  )
  const filteredChallengeReceipts = useMemo(() => {
    return Object.keys(challengeReceipts).filter(
      (address) =>
        challengeReceipts[address].challengeReward.toBase58() ===
        challengeAddresses,
    )
  }, [challengeAddresses, challengeReceipts])

  return filteredChallengeReceipts
}
