import { Space, Typography } from 'antd'

import Icon from '@ant-design/icons'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { ReactComponent as Ticket } from 'static/images/icons/ticket-icon.svg'

const TotalSpined = () => {
  const selectedCampaign = useSelectedCampaign()
  const lotteryInfo = useLotteryInfo(selectedCampaign)

  return (
    <Space size={4} className="remaining-ticket space-middle-icon">
      <Typography.Text>Total spins:</Typography.Text>
      <Typography.Title level={5} className="gradient-text">
        {lotteryInfo.totalPicked.toNumber()}
      </Typography.Title>
      <Icon style={{ fontSize: 20 }} component={Ticket} />
    </Space>
  )
}

export default TotalSpined
