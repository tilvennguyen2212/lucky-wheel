import { Button } from 'antd'
import { useGetTokenAccountByChallengeReward } from 'hooks/challengeReward/useGetTokenAccountByChallengeReward'

import { useWithdrawChallengeReward } from 'hooks/challengeReward/useWithdrawChallengeReward'

const WithdrawNft = ({
  challengeRewardAddress,
}: {
  challengeRewardAddress: string
}) => {
  const { withdrawChallengeReward, loading } = useWithdrawChallengeReward()
  const getTokenAccountByChallengeReward = useGetTokenAccountByChallengeReward()

  const onWithdraw = async () => {
    const tokenAccounts = await getTokenAccountByChallengeReward(
      challengeRewardAddress,
    )
    await withdrawChallengeReward({
      amount: 1,
      mint: tokenAccounts[0].mint,
      challengeReward: challengeRewardAddress,
    })
  }

  return (
    <Button loading={loading} onClick={onWithdraw} block type="primary">
      Withdraw 1 NFT
    </Button>
  )
}

export default WithdrawNft
