import { Fragment, useState } from 'react'
import { Button, Col, Input, Modal, Row, Typography } from 'antd'
import { useInitializeCampaign } from 'hooks/admin/useIntializeCampaign'
import configs from 'configs'
import axios from 'axios'

const CreateCampaign = () => {
  const [visible, setVisible] = useState(false)
  const [picker, setPicker] = useState<string>('')
  const { onInitializeCampaign, loading } = useInitializeCampaign()

  const onCreate = () => {
    onInitializeCampaign(Array.from(Buffer.from(picker, 'hex')))
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
        Create Campaign Now
      </Button>
      <Modal
        title="Create Campaign"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onCreate}
        okText="Create"
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

export default CreateCampaign
