import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'
import { Button, Col, InputNumber, Row, Space, Typography } from 'antd'
import { useRewardByCampaign } from 'hooks/reward/useRewardByCampaign'
import { notifyError, notifySuccess } from 'helper'

const ListTicketReward = ({ campaign }: { campaign: string }) => {
  const [newRatio, setNewRatio] = useState(0)
  const rewards = useRewardByCampaign(campaign)

  const updateRatio = async (index: number) => {
    try {
      const rewardAddress = Object.keys(rewards)[index]
      const toLuckyNumber = new BN('1' + '0'.repeat(18))
        .mul(new BN(newRatio * 10 ** 9))
        .div(new BN(100 * 10 ** 9))
      const { txId } = await window.luckyWheel.updateLuckyRatio({
        reward: new web3.PublicKey(rewardAddress),
        campaign: new web3.PublicKey(campaign),
        fromLuckyNumber: new BN(0),
        toLuckyNumber: toLuckyNumber,
      })
      notifySuccess('Update ratio successfully', txId)
    } catch (err) {
      notifyError(err)
    }
  }

  return (
    <Row gutter={[24, 24]} style={{ paddingTop: 32 }}>
      {Object.values(rewards).map((reward, idx) => {
        if (!reward.rewardType.ticket) return null
        return (
          <Col span={24}>
            <Row gutter={[24, 24]} wrap={false}>
              <Col>
                <Typography.Text>Ticket reward</Typography.Text>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Prize Amount
                  </Typography.Text>
                  {reward.prizeAmount.toString()}
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Reserve Prize
                  </Typography.Text>
                  <Typography.Text>
                    {reward.reservePrize.toNumber()}
                  </Typography.Text>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">Ratio</Typography.Text>
                  <Typography.Text>
                    {(Number(reward.toLuckyNumber.toString()) / 10 ** 18) * 100}
                    %
                  </Typography.Text>
                </Space>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    Update ratio
                  </Typography.Text>
                  <Space>
                    <InputNumber onChange={(val) => setNewRatio(Number(val))} />
                    <Button onClick={() => updateRatio(idx)}>Update</Button>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}

export default ListTicketReward
