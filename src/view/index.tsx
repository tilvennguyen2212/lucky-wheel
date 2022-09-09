import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppRoute } from '@sentre/senhub'

import { Col, Row } from 'antd'
import Confetti from 'react-confetti'
import Admin from './admin'
import Dashboard from './dashboard'
import Winners from 'components/winners'
import EmptyCampaign from 'components/emptyCampaign'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { AppLoader } from './appLoader'
import { AppWatcher } from 'watcher'
import { AppState } from 'model'

import './index.less'
import 'swiper/css/bundle'

const View = () => {
  const { opacity, numberOfPieces, gravity, zIndex } = useSelector(
    (state: AppState) => state.main.confetti,
  )
  const { root, extend } = useAppRoute()
  const selectedCampaign = useSelectedCampaign()

  return (
    <AppLoader>
      <AppWatcher>
        <EmptyCampaign campaignAddress={selectedCampaign}>
          <Row gutter={[24, 24]}>
            <Confetti
              style={{ zIndex, width: '100%' }}
              gravity={gravity}
              opacity={opacity}
              numberOfPieces={numberOfPieces}
            />
            <Col span={24}>
              <Winners />
            </Col>
            <Col span={24}>
              <Switch>
                <Route exact path={extend('/admin')} component={Admin} />
                <Route
                  exact
                  path={extend('/dashboard')}
                  component={Dashboard}
                />
                <Redirect from={root} to={`${root}/dashboard`} />
              </Switch>
            </Col>
          </Row>
        </EmptyCampaign>
      </AppWatcher>
    </AppLoader>
  )
}

export default View
