import { useState } from 'react'

import { Button, Collapse, InputNumber } from 'antd'
import { Popover, Typography, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import WithdrawReward from '../withdraw'
import DepositReward from '../deposit'

import { useUpdateRatio } from 'hooks/admin/useUpdateRatio'
import { useReward } from 'hooks/reward/useReward'

const ColumnAction = ({ rewardAddress }: { rewardAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [ratio, setRatio] = useState('')
  const reward = useReward(rewardAddress)
  const { updateRatio, loading: ratioLoading } = useUpdateRatio()

  const onUpdateRatio = () => {
    updateRatio({
      campaign: reward.campaign.toBase58(),
      rewardAddress,
      ratio: Number(ratio),
    })
  }
  return (
    <Popover
      content={
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Update Ratio" key="1">
            <Row gutter={[12, 12]} justify="space-between">
              <Col>
                <Typography.Text>New Ratio:</Typography.Text>
              </Col>
              <Col span={24}>
                <InputNumber
                  value={ratio}
                  onChange={setRatio}
                  min={'0.0000000000000001'}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={24}>
                <Button
                  onClick={onUpdateRatio}
                  loading={ratioLoading}
                  block
                  type="primary"
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel header="Deposit" key="2">
            <DepositReward rewardAddress={rewardAddress} />
          </Collapse.Panel>
          <Collapse.Panel header="Withdraw" key="Withdraw">
            <WithdrawReward rewardAddress={rewardAddress} />
          </Collapse.Panel>
        </Collapse>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomLeft"
    >
      <Button onClick={() => setVisible(!visible)}>
        <IonIcon name="create-outline" />
      </Button>
    </Popover>
  )
}

export default ColumnAction
