import { Col, Row } from 'antd'
import CreateMintReward from './createMintReward'
import ListMintReward from './listMintReward'

const CampaignManagement = ({ campaign }: { campaign: string }) => {
  return (
    <Row justify="center" gutter={[24, 24]}>
      <Col span={24}>
        <div>{campaign}</div>
      </Col>
      <Col span={12}>
        <CreateMintReward campaign={campaign} />
        <ListMintReward campaign={campaign} />
      </Col>
      <Col span={12}>
        Create Reward NFT
        <div>{campaign}</div>
      </Col>
    </Row>
  )
}

export default CampaignManagement
