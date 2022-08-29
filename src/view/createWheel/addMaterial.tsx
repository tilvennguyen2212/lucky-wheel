import { useState } from 'react'

import {
  Avatar,
  Col,
  Image,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from 'antd'
import SelectTypeReward from './selectTypeReward'
import { Reward } from 'constant'
import { MintAvatar, MintSelection } from 'shared/antd/mint'

import TICKET from 'static/images/ticket.png'
import NFT from 'static/images/nft.png'
import GoodLuck from 'static/images/image-test/1.png'

export type Material = {
  type: string
  value: string
}

type AddMaterialProps = {
  material: Material[]
  setMaterial: (value: Material[]) => void
}

const AddMaterial = ({ material, setMaterial }: AddMaterialProps) => {
  const [amount, setAmount] = useState(0)

  const onSetTotal = (total: number) => {
    const next: Material[] = []
    for (let i = 0; i < total; i++) {
      next.push({ type: '', value: '' })
    }
    setMaterial(next)
    return setAmount(total)
  }

  const onSelectType = (type: string, index: number) => {
    const nextMaterial = [...material]
    const value =
      type === Reward.GoodLuck || type === Reward.Ticket
        ? nextMaterial[index].value
        : type + index
    nextMaterial[index] = { value, type }
    return setMaterial(nextMaterial)
  }

  const onInputReward = (address: string, index: number) => {
    const nextMaterial = [...material]
    nextMaterial[index] = { ...nextMaterial[index], value: address }
    return setMaterial(nextMaterial)
  }

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Title level={5}>Add Reward</Typography.Title>
      </Col>
      <Col span={24}>
        <Space size={12} style={{ width: '100%' }}>
          <Typography.Text>Total Rewards: </Typography.Text>
          <InputNumber
            style={{ width: '100%' }}
            value={amount}
            onChange={onSetTotal}
            max={12}
          />
        </Space>
      </Col>
      {material.map(({ value, type }, index) => (
        <Col span={24} key={index}>
          <Space>
            {type !== Reward.Token ? (
              <Input
                value={value}
                onChange={(e) => onInputReward(e.target.value, index)}
                disabled={type !== Reward.NFT}
              />
            ) : (
              <MintSelection
                value={value}
                onChange={(e) => onInputReward(e, index)}
              />
            )}

            <SelectTypeReward
              onSelect={(value) => onSelectType(value, index)}
            />
            {type === Reward.Token && (
              <MintAvatar size={48} mintAddress={value} />
            )}
            {type === Reward.NFT && value && <Avatar size={48} src={NFT} />}
            {type === Reward.GoodLuck && <Avatar size={48} src={GoodLuck} />}
            {type === Reward.Ticket && <Image preview={false} src={TICKET} />}
          </Space>
        </Col>
      ))}
    </Row>
  )
}
export default AddMaterial
