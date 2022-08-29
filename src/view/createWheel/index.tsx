import { useState } from 'react'

import AddMaterial, { Material } from './addMaterial'
import { Button, Col, Row, Space } from 'antd'
import Wheel from './wheel'

import './index.less'

const CreateWheel = () => {
  const [material, setMaterial] = useState<Material[]>([])
  const [reward, setReward] = useState<Material[]>([])

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
            <Button onClick={() => setReward(material)} type="primary">
              Submit
            </Button>
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default CreateWheel
