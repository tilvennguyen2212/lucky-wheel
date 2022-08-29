import { Select } from 'antd'
import { Reward } from 'constant'

const SelectTypeReward = ({
  onSelect,
}: {
  onSelect: (value: string) => void
}) => {
  return (
    <Select
      onChange={onSelect}
      placeholder="Select type of Reward"
      style={{ width: 180 }}
    >
      <Select.Option value={Reward.Token}>Token</Select.Option>
      <Select.Option value={Reward.Ticket}>Ticket +1</Select.Option>
      <Select.Option value={Reward.GoodLuck}>Good luck</Select.Option>
      <Select.Option value={Reward.NFT}>NFT</Select.Option>
    </Select>
  )
}

export default SelectTypeReward
