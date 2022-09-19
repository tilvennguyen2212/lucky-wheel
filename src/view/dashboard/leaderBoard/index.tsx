import { Col, Row, Tabs } from 'antd'
import TablePrize from './tablePrize'
import TableSpin from './tableSpin'

import './index.less'

const enum TabLeaderBoard {
  prize = 'Top prize',
  spin = 'Top spin',
}

const LeaderBoard = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Tabs
          defaultActiveKey={TabLeaderBoard.prize}
          className="tabs-leader-board"
          size="large"
        >
          <Tabs.TabPane key={TabLeaderBoard.prize} tab={TabLeaderBoard.prize}>
            <TablePrize />
          </Tabs.TabPane>

          <Tabs.TabPane key={TabLeaderBoard.spin} tab={TabLeaderBoard.spin}>
            <TableSpin />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default LeaderBoard
