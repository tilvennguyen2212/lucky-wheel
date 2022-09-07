import { useState } from 'react'
import { BN, web3 } from '@project-serum/anchor'

import { Button, Collapse, Popover, Row } from 'antd'
import { Col, Typography, InputNumber } from 'antd'

import { notifyError, notifySuccess } from 'helper'

const PrintTicket = ({ campaignAddress }: { campaignAddress: string }) => {
  const [amount, setAmount] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const onPrintTicket = async () => {
    try {
      setLoading(true)
      const { txId } = await window.luckyWheel.printTicketMint({
        campaign: new web3.PublicKey(campaignAddress),
        amount: new BN(amount),
      })
      notifySuccess('Print ticket', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover
      content={
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Print Ticket" key="1">
            <Row gutter={[12, 12]} justify="space-between">
              <Col>
                <Typography.Text>Total Amount:</Typography.Text>
              </Col>
              <Col span={24}>
                <InputNumber
                  value={amount}
                  onChange={setAmount}
                  min={'0'}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={24}>
                <Button
                  onClick={onPrintTicket}
                  loading={loading}
                  block
                  type="primary"
                >
                  Print
                </Button>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomLeft"
    >
      <Button key="2" onClick={() => setVisible(true)}>
        Print Ticket
      </Button>
    </Popover>
  )
}

export default PrintTicket
