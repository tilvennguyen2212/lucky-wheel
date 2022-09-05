import { Redirect, Route, Switch } from 'react-router-dom'

import { Col, Row } from 'antd'
import Admin from './admin'
import Dashboard from './dashboard'
import Winners from 'components/winners'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from './appLoader'
import { AppWatcher } from 'watcher'

import './index.less'
import 'swiper/css/bundle'

const View = () => {
  const { appRoute } = useAppRouter()

  return (
    <AppLoader>
      <AppWatcher>
        <Row gutter={[24, 24]}>
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
      </AppWatcher>
    </AppLoader>
  )
}

export default View
