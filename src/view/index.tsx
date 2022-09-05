import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Confetti from 'react-confetti'
import { Col, Row } from 'antd'
import Admin from './admin'
import Dashboard from './dashboard'
import Winners from 'components/winners'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from './appLoader'
import { AppWatcher } from 'watcher'
import { AppState } from 'model'

import './index.less'
import 'swiper/css/bundle'
import EmptyCampaign from 'components/emptyCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

const View = () => {
  const congratulate = useSelector((state: AppState) => state.main.congratulate)
  const { appRoute } = useAppRouter()
  const selectedCampaign = useSelectedCampaign()

  return (
    <AppLoader>
      <AppWatcher>
        <EmptyCampaign campaignAddress={selectedCampaign}>
          <Row gutter={[24, 24]}>
            {congratulate && (
              <Confetti
                style={{ zIndex: 9999 }}
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                gravity={0.5}
                tweenDuration={10000}
              />
            )}
            <Col span={24}>
              <Winners />
            </Col>
            <Col span={24}>
              <Switch>
                <Route exact path={`${appRoute}/admin`} component={Admin} />
                <Route
                  exact
                  path={`${appRoute}/dashboard`}
                  component={Dashboard}
                />
                <Redirect from={appRoute} to={`${appRoute}/dashboard`} />
              </Switch>
            </Col>
          </Row>
        </EmptyCampaign>
      </AppWatcher>
    </AppLoader>
  )
}

export default View
