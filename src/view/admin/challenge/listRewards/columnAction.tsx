import { useState } from 'react'

import { Button, Collapse } from 'antd'
import { Popover } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import WithdrawReward from '../withdraw'
import DepositReward from '../deposit'

const ColumnAction = ({ rewardAddress }: { rewardAddress: string }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Popover
      content={
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Deposit" key="1">
            <DepositReward challengeRewardAddress={rewardAddress} />
          </Collapse.Panel>
          <Collapse.Panel header="Withdraw" key="Withdraw">
            <WithdrawReward challengeRewardAddress={rewardAddress} />
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
