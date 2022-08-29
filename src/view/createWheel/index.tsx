import { useState } from 'react'

import AddMaterial, { Material } from './addMaterial'
import { Button, Col, Row, Space } from 'antd'
import Wheel from './wheel'

import { useInitWheel } from 'hooks/action/useInitWheel'

import './index.less'

const CreateWheel = () => {
  const [material, setMaterial] = useState<Material[]>([])
  const [reward, setReward] = useState<Material[]>([])
  const { createWheel } = useInitWheel()

  const onCreate = () => {
    createWheel()
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
