import { MintAvatar, MintSymbol } from '@sen-use/app/dist'
import IonIcon from '@sentre/antd-ionicon'

import { Button, Col, Image, Modal, Row, Typography } from 'antd'

import BG from 'static/images/bg-popup.svg'

type CongratsProps = {
  visible: boolean
  onClose: (value: false) => void
  prize: string
}

const Congrats = ({ onClose, visible, prize }: CongratsProps) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      footer={null}
      closeIcon={<IonIcon name="close-outline" />}
      className="congrats"
    >
      <Image preview={false} src={BG} />
      <Row gutter={[16, 16]} className="congrats_content">
        <Col span={24}>
          <Typography.Title level={4} className="gradient-text">
            Congratulations!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>You have received a reward!</Typography.Text>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <MintAvatar size={96} mintAddress={prize} />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>
            1000 <MintSymbol mintAddress={prize} />
          </Typography.Title>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <Button size="large" type="primary" block>
            CLAIM
          </Button>
        </Col>
        <Col span={24}>
          <Button size="large" block>
            SPIN MORE
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congrats
