import { Button } from 'antd'

import { useWithdrawReward } from 'hooks/admin/useWithdrawReward'
import { useGetTokenAccountByReward } from 'hooks/reward/useGetTokenAccountByReward'

const WithdrawNft = ({ rewardAddress }: { rewardAddress: string }) => {
  const { withdrawReward } = useWithdrawReward()
  const getTokenAccountByReward = useGetTokenAccountByReward()

  const onWithdraw = async () => {
    const tokenAccounts = await getTokenAccountByReward(rewardAddress)
    await withdrawReward({
      totalPrize: 1,
      mint: tokenAccounts[0].mint,
      reward: rewardAddress,
    })
  }

  return (
    <Button onClick={onWithdraw} block type="primary">
      Withdraw 1 NFT
    </Button>
  )
}

export default WithdrawNft
