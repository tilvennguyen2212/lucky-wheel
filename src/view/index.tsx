import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateWheel from './createWheel'
import Dashboard from './dashboard'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppLoader } from './appLoader'
import { AppDispatch } from 'model'
import { intCampaign } from 'model/campaigns.controller'

import './index.less'

const View = () => {
  const { appRoute } = useAppRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(intCampaign())
  }, [dispatch])

  return (
    <AppLoader>
      <Switch>
        <Route
          exact
          path={`${appRoute}/create-wheel`}
          component={CreateWheel}
        />
        <Route exact path={`${appRoute}/dashboard`} component={Dashboard} />
        <Redirect from={appRoute} to={`${appRoute}/dashboard`} />
      </Switch>
    </AppLoader>
  )
}

export default View
