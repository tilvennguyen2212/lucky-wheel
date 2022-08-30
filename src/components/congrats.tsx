import IonIcon from '@sentre/antd-ionicon'
import { util } from '@sentre/senhub'

import { Col, Modal, Row, Typography } from 'antd'

// import BG from 'static/images/bg-popup.svg'

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
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title style={{ color: 'red' }} level={5}>
            Congrats: {util.shortenAddress('23423423sdfsdfsdfssdf')}
          </Typography.Title>
        </Col>
        <Col span={24}>
          You have received the :
          <span style={{ color: '#FFBE45', textTransform: 'uppercase' }}>
            {prize}
          </span>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congrats
