import { Fragment, useState } from 'react'
import axios from 'axios'

import { Button, Col, Input, Modal, Row, Typography } from 'antd'

import { useWalletAddress } from '@sentre/senhub'
import configs from 'configs'
import { notifyError, notifySuccess } from 'helper'

const UpdatePicker = ({ campaignAddress }: { campaignAddress: string }) => {
  const [picker, setPicker] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const walletAddress = useWalletAddress()

  const onUpdate = async () => {
    try {
      setLoading(true)
      const txId = await window.luckyWheel.program.methods
        .updatePicker(Array.from(Buffer.from(picker, 'hex')))
        .accounts({
          authority: walletAddress,
          campaign: campaignAddress,
        })
        .rpc()
      notifySuccess('Update picker', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  const onSetSentrePicker = async () => {
    const { data: picker } = await axios.get(configs.api.lottery.publicKey, {
      withCredentials: true,
    })
    const pickerPublickey = await window.luckyWheel.decodePickerPublickey(
      picker,
    )
    setPicker(Buffer.from(pickerPublickey).toString('hex'))
  }

  const onSetDefaultPicker = async () => {
    const pickerPublickey = Array.from(window.luckyWheel.picker.pubKey)
    setPicker(Buffer.from(pickerPublickey.slice(1, 65)).toString('hex'))
  }

  return (
    <Fragment>
      <Button type="primary" onClick={() => setVisible(true)}>
        Update Picker
      </Button>
      <Modal
        title="Create Campaign"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onUpdate}
        okText="Update"
        confirmLoading={loading}
      >
        <Row gutter={[12, 12]} justify="space-between">
          <Col>
            <Typography.Text>Picker (Hex):</Typography.Text>
          </Col>
          <Col span={24}>
            <Input
              value={picker}
              onChange={(e) => setPicker(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Button type="primary" block onClick={onSetSentrePicker}>
              Sentre Picker
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block onClick={onSetDefaultPicker}>
              Default Picker
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default UpdatePicker
