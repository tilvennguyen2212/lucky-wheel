import { Col, Row } from 'antd'
import CreateMintReward from './createMintReward'
import CreateNftReward from './createNftReward'
import ListMintReward from './listMintReward'
import ListNftReward from './listNftReward'

const CampaignManagement = ({ campaign }: { campaign: string }) => {
  return (
    <Row justify="center" gutter={[62, 62]}>
      <Col span={12}>
        <CreateMintReward campaign={campaign} />
        <ListMintReward campaign={campaign} />
      </Col>
      <Col span={12}>
        <CreateNftReward campaign={campaign} />
        <ListNftReward campaign={campaign} />
      </Col>
    </Row>
  )
}

export default CampaignManagement
