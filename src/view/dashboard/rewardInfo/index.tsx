import { useMemo } from 'react'

import { Col, Modal, Row, Table, Typography } from 'antd'

import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { COLUMNS_REWARD_INFO } from './column'

import './index.less'

type RewardInfoProps = {
  visible: boolean
  onClose: (visible: boolean) => void
}

const RewardInfo = ({ visible, onClose }: RewardInfoProps) => {
  const campaignId = useSelectedCampaign()
  const rewards = useRewardByCampaign(campaignId)

  const formatRewards = useMemo(() => {
    let listReward = Object.keys(rewards).map((address) => {
      return { address, ...rewards[address] }
    })
    const nftReward = listReward.filter(
      ({ rewardType }) => rewardType.nftCollection,
    )
    const tokenReward = listReward.filter(({ rewardType }) => rewardType.token)
    const ticketReward = listReward.filter(
      ({ rewardType }) => rewardType.ticket,
    )
    return (listReward = nftReward
      .concat(tokenReward)
      .concat(ticketReward)
      .map((reward, index) => ({ ...reward, index })))
  }, [rewards])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      footer={null}
      style={{ padding: 0 }}
      className="reward-info"
      title={<Typography.Title level={4}>Reward information</Typography.Title>}
    >
      <Row>
        <Col span={24} style={{ maxHeight: 300 }} className="scrollbar">
          <Table
            columns={COLUMNS_REWARD_INFO}
            dataSource={formatRewards}
            bordered={false}
            pagination={false}
            style={{ width: '100%' }}
            rowKey={(record) => record.address}
          />
        </Col>
      </Row>
    </Modal>
  )
}
export default RewardInfo
