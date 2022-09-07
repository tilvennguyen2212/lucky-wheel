import { NFTSelection } from '@sen-use/components'

import { useChallengeRewardData } from 'hooks/challengeReward/useChallengeData'
import { useDepositChallengeReward } from 'hooks/challengeReward/useDepositChallengeReward'

const DepositNft = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const { onDepositChallengeReward } = useDepositChallengeReward()
  const challengeReward = useChallengeRewardData(challengeRewardAddress)

  const onDeposit = async (mint: string) => {
    await onDepositChallengeReward({
      campaign: challengeReward.campaign.toBase58(),
      challengeReward: challengeRewardAddress,
      mint,
      amount: 1,
    })
  }

  return (
    <NFTSelection
      collectionAddress={[challengeReward.mint.toBase58()]}
      onSelect={onDeposit}
    />
  )
}

export default DepositNft
