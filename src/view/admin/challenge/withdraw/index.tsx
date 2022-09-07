import WithdrawMint from './withdrawMint'
import WithdrawNft from './withdrawNft'

import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'

const WithdrawReward = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const challengeReward = useChallengeRewardData(challengeRewardAddress)

  if (challengeReward.rewardType.nftCollection)
    return <WithdrawNft challengeRewardAddress={challengeRewardAddress} />
  return <WithdrawMint challengeRewardAddress={challengeRewardAddress} />
}

export default WithdrawReward
