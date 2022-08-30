import { useSelector } from 'react-redux'

import { Space } from 'antd'

import { AppState } from 'model'

type ColumnRewardProps = {
  rewardAddress: string
}

const ColumnReward = ({ rewardAddress }: ColumnRewardProps) => {
  console.log(rewardAddress, 'rewardAddress')
  const mint = useSelector((state: AppState) => state.rewards[rewardAddress])

  console.log(mint)

  return <Space></Space>
}

export default ColumnReward
