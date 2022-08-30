import { useState } from 'react'

import AddMaterial, { Material } from './addMaterial'
import { Button, Col, Row, Space } from 'antd'
import Wheel from './wheel'

import { useInitWheel } from 'hooks/action/useInitWheel'

import './index.less'
import { Reward } from 'constant'

const CreateWheel = () => {
  const [material, setMaterial] = useState<Material[]>([])
  const [reward, setReward] = useState<Material[]>([])
  const { createWheel } = useInitWheel()

  const onCreate = () => {
    createWheel([
      {
        type: Reward.NFT,
        mint: 'E4TjUsbKHLtpZqT6iFHnsCi8NYiAxHL32hpkFAvrQA3H',
        amount: 1,
        frequencyWinning: 0.1,
        numberOfReward: 1,
      },
      {
        type: Reward.Token,
        mint: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
        amount: 3,
        frequencyWinning: 0.2,
        numberOfReward: 2,
      },
      {
        type: Reward.Ticket,
      },
    ])
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={14}>
        <Wheel rewards={reward} />
      </Col>
      <Col span={8}>
        <Space size={30} direction="vertical" style={{ width: '100%' }}>
          <AddMaterial material={material} setMaterial={setMaterial} />
          <Space>
            <Button
              onClick={() => {
                setReward([])
                setMaterial([])
              }}
            >
              Clear
            </Button>
            <Button onClick={onCreate} type="primary">
              Submit
            </Button>
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default CreateWheel
