import { useInfix, Infix } from '@sentre/senhub'

import { Col, Row } from 'antd'
import Card from 'antd/lib/card/Card'
import TotalSpined from './totalSpined'
import ListGift from './listGift'
import ProgressBar from './progressBar'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengePercent } from 'hooks/useChallengePercent'

import './index.less'

const Challenge = () => {
  const selectedCampaign = useSelectedCampaign()
  const challengePecent = useChallengePercent()
  const lotteryInfo = useLotteryInfo(selectedCampaign)
  const infix = useInfix()

  const isMobile = infix < Infix.xl
  const direction = isMobile ? 'vertical' : 'horizontal'
  const rowGap = isMobile ? 48 : 150
  const wrapCln = isMobile
    ? 'card-challenge mobile-direction'
    : 'card-challenge'

  return (
    <Row className="challenge">
      <Col span={24}>
        <Card className={wrapCln}>
          <Row gutter={[24, rowGap]} justify="center">
            <Col span={24}>
              <Row className="inner-challenge-progress">
                <Col className="challenge-gifts" span={24}>
                  <ListGift />
                </Col>
                <Col className="challenge-progress">
                  <ProgressBar
                    percent={
                      lotteryInfo.totalPicked.toNumber() * challengePecent
                    }
                    strokeWitdh={12}
                    background="#212433"
                    successColor="linear-gradient(84.24deg, #9945FF 0%, #B9F8FD 100%)"
                    direction={direction}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="challenge-action">
              <TotalSpined />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Challenge
