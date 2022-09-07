import { AppState } from 'model'
import { useSelector } from 'react-redux'
import DepositMint from './depositMint'
import DepositNft from './depositNft'

const DepositReward = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const challengeRewardData = useSelector(
    (state: AppState) => state.challengeRewards[challengeRewardAddress],
  )

  if (challengeRewardData.rewardType.nftCollection)
    return <DepositNft rewardAddress={challengeRewardAddress} />

  return <DepositMint challengeRewardAddress={challengeRewardAddress} />
}

export default DepositReward
