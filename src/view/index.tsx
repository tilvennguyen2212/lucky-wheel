import { Redirect, Route, Switch } from 'react-router-dom'

import CreateWheel from './createWheel'
import Dashboard from './dashboard'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from './appLoader'

import './index.less'
import { AppWatcher } from 'watcher'

const View = () => {
  const { appRoute } = useAppRouter()

  return (
    <AppLoader>
      <AppWatcher>
        <Switch>
          <Route
            exact
            path={`${appRoute}/create-wheel`}
            component={CreateWheel}
          />
          <Route exact path={`${appRoute}/dashboard`} component={Dashboard} />
          <Redirect from={appRoute} to={`${appRoute}/dashboard`} />
        </Switch>
      </AppWatcher>
    </AppLoader>
  )
}

export default View
