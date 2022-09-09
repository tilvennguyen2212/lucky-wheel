import { useInfix, Infix, useWidth } from '@sentre/senhub'

import { Col, Row } from 'antd'
import Card from 'antd/lib/card/Card'
import TotalSpined from './totalSpined'
import ListGift from './listGift'
import ProgressBar from './progressBar'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengePercent } from 'hooks/useChallengePercent'

import './index.less'

const ITEM_REWARD_WIDTH_RATIO = 15
const ITEM_REWARD_MOBILE_WIDTH_RATIO = 12

const Challenge = () => {
  const selectedCampaign = useSelectedCampaign()
  const { challengePecrent, totalChallenge } = useChallengePercent()
  const lotteryInfo = useLotteryInfo(selectedCampaign)
  const infix = useInfix()
  const screenWidth = useWidth()

  const isMobile = infix < Infix.lg
  const wrapCln = isMobile
    ? 'card-challenge mobile-direction'
    : 'card-challenge'
  const widthRatio = isMobile
    ? ITEM_REWARD_MOBILE_WIDTH_RATIO
    : ITEM_REWARD_WIDTH_RATIO
  const fitWitdh =
    widthRatio * totalChallenge < screenWidth
      ? '100%'
      : widthRatio * totalChallenge

  return (
    <Row className="challenge">
      <Col span={24}>
        <Card className={wrapCln}>
          <Row gutter={[24, 24]} justify="center">
            <Col className="scroll-challenge" span={24}>
              <Row
                className="inner-challenge-progress"
                style={{
                  width: fitWitdh,
                }}
              >
                <Col className="challenge-gifts" style={{ width: '100%' }}>
                  <ListGift />
                </Col>
                <Col className="challenge-progress" style={{ width: '100%' }}>
                  <ProgressBar
                    percent={
                      lotteryInfo.totalPicked.toNumber() * challengePecrent
                    }
                    strokeWitdh={12}
                    background="#212433"
                    successColor="linear-gradient(84.24deg, #9945FF 0%, #B9F8FD 100%)"
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
