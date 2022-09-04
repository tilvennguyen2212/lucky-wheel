import { util } from '@sentre/senhub'
import { useReward } from 'hooks/reward/useReward'

const RewardRatio = ({ rewardAddress }: { rewardAddress: string }) => {
  const reward = useReward(rewardAddress)

  let ratio = 0
  if (!!reward) {
    ratio = Number(reward.toLuckyNumber.sub(reward.fromLuckyNumber)) / 10 ** 18
  }

  return <span>{util.numeric(ratio).format('0,0.[0000]%')}</span>
}
export default RewardRatio
