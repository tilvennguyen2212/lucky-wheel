import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'

type ColumnActionProps = {
  rewardAddress: string
}

const ColumnAction = ({ rewardAddress }: ColumnActionProps) => {
  const mint = useSelector(
    (state: AppState) => state.rewards[rewardAddress].mint,
  )
  console.log(mint)
  return <Button>Claim</Button>
}

export default ColumnAction
