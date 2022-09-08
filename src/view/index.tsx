import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Confetti from 'react-confetti'

import { Col, Row } from 'antd'
// import Admin from './admin'
import Dashboard from './dashboard'
import Winners from 'components/winners'
import EmptyCampaign from 'components/emptyCampaign'
import Admin from './admin'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from './appLoader'
import { AppWatcher } from 'watcher'
import { AppState } from 'model'

import './index.less'
import 'swiper/css/bundle'

const View = () => {
  const { opacity, numberOfPieces, gravity, zIndex } = useSelector(
    (state: AppState) => state.main.confetti,
  )
  const { appRoute } = useAppRouter()
  const selectedCampaign = useSelectedCampaign()

  return (
    <AppLoader>
      <AppWatcher>
        <EmptyCampaign campaignAddress={selectedCampaign}>
          <Row gutter={[24, 24]}>
            <Confetti
              style={{ zIndex }}
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={true}
              gravity={gravity}
              opacity={opacity}
              numberOfPieces={numberOfPieces}
            />
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
