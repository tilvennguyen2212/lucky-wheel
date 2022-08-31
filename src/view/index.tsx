import { Redirect, Route, Switch } from 'react-router-dom'

import { Affix, Col, Row } from 'antd'
import CreateWheel from './createCampaign'
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
            <Affix>
              <Winners />
            </Affix>
          </Col>
          <Col span={24}>
            <Switch>
              <Route
                exact
                path={`${appRoute}/create-wheel`}
                component={CreateWheel}
              />
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
