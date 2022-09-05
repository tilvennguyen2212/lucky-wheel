import IonIcon from '@sentre/antd-ionicon'

import { Avatar, Button, Col, Modal, Row, Typography } from 'antd'
import GoodLuckIcon from 'static/images/good-luck-icon.png'

type GoodLuckProps = {
  visible: boolean
  onClose: (value: false) => void
  onSpinning: (amount: number, isMul: boolean) => void
}

const NotifyGoodLuck = ({ onClose, visible, onSpinning }: GoodLuckProps) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      footer={null}
      closeIcon={<IonIcon name="close-outline" />}
      className="congrats"
    >
      <Row gutter={[16, 16]} className="congrats_content">
        <Col span={24}>
          <Avatar size={96} shape="circle" src={GoodLuckIcon} />
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Typography.Title level={4} className="gradient-text">
            Good luck
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text type="secondary">
            You have almost reached. Try again.
          </Typography.Text>
        </Col>
        <Col span={24} /> {/** Safe place */}
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => {
              onClose(false)
              onSpinning(1, false)
            }}
          >
            SPIN AGAIN
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default NotifyGoodLuck
